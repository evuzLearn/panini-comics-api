import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories, Utils, Services } from '../../types.inject';
import { ScrapingRepository } from '../Repositories/ScrapingRepository';
import { SaveComicService } from '../../Database/Services/SaveComicService';

export class ScrapingMarvelCollectionsService implements IService {
  constructor(
    @inject(Repositories.ScrapingMarvel) private marvelRepository: ScrapingRepository,
    @inject(Services.SaveComic) private saveComicService: SaveComicService,
    @inject(Utils.config) private config: any,
  ) {}

  execute() {
    const { requestDelay } = this.config;
    return this.marvelRepository.getCollections().then(collectionsWithLinks => {
      return Promise.all(
        collectionsWithLinks.slice(0, 1).map(({ link, collection }, i) => {
          return new Promise(resolve => {
            setTimeout(() => {
              this.marvelRepository
                .getComics(link)
                .then(comics => {
                  console.log(`${i}: RES => ${collection.name}`);
                  collection.comics = comics;
                  return Promise.all(comics.map(comic => this.saveComicService.execute(comic)));
                })
                .then(() => resolve(collection));
            }, requestDelay * i);
            if (collectionsWithLinks.length - 1 === i) {
              const seconds = (requestDelay * i) / 1000;
              console.log(`The last request will be made in ${seconds} seconds`);
            }
          });
        }),
      );
    });
  }
}
