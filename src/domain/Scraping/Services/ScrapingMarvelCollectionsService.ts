import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories, Utils, Services } from '../../types.inject';
import { ScrapingRepository } from '../Repositories/ScrapingRepository';
import { SaveComicService } from '../../Database/Services/SaveComicService';
import { SaveCollectionService } from '../../Database/Services/SaveCollectionService';
import { Collection } from '../../Entities/Collection';
import { Config } from '../../config';

export class ScrapingMarvelCollectionsService implements IService {
  constructor(
    @inject(Repositories.ScrapingMarvel) private marvelRepository: ScrapingRepository,
    @inject(Services.SaveComic) private saveComicService: SaveComicService,
    @inject(Services.SaveCollection) private saveCollectionService: SaveCollectionService,
    @inject(Utils.config) private config: Config,
  ) {}

  async execute(): Promise<Collection[]> {
    const { request_delay } = this.config;
    const collections = await this.marvelRepository.getCollections();
    return Promise.all(
      collections.map(({ link, collection }, i, { length }) => {
        return new Promise(resolve => {
          setTimeout(() => {
            this.marvelRepository
              .getComics(link)
              .then(comics => {
                console.log(`${i}: RES => ${collection.name}`);
                collection.comics = comics;
                return Promise.all(
                  comics.map(comic => {
                    return this.saveComicService.execute(comic);
                  }),
                );
              })
              .then(comics => {
                collection.comics = comics;
                return this.saveCollectionService.execute(collection);
              })
              .then(collectionSaved => {
                collectionSaved.comics = collection.comics;
                resolve(collectionSaved);
              });
          }, request_delay * i);
          if (i && length - 1 === i) {
            const seconds = (request_delay * i) / 1000;
            console.log(`The last request will be made in ${seconds} seconds`);
          }
        });
      }),
    );
  }
}
