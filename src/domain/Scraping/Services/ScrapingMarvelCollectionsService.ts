import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories, Utils } from '../../types.inject';
import { ScrapingRepository } from '../Repositories/ScrapingRepository';

export class ScrapingMarvelCollectionsService implements IService {
  constructor(
    @inject(Repositories.ScrapingMarvel) private marvelRepository: ScrapingRepository,
    @inject(Utils.config) private config: any,
  ) {}

  execute() {
    const { requestDelay } = this.config;
    return this.marvelRepository.getCollections().then(collectionsWithLinks => {
      return Promise.all(
        collectionsWithLinks.slice(0, 5).map(({ link, collection }, i) => {
          return new Promise(resolve => {
            setTimeout(() => {
              this.marvelRepository.getComics(link).then(comics => {
                console.log(`${i}: RES => ${collection.name}`);
                collection.comics = comics;
                resolve(collection);
              });
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
