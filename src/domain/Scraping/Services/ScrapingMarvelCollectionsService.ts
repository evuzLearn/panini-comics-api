import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories } from '../../types.inject';
import { ScrapingRepository } from '../Repositories/ScrapingRepository';

export class ScrapingMarvelCollectionsService implements IService {
  constructor(@inject(Repositories.ScrapingMarvel) private marvelRepository: ScrapingRepository) {}

  execute() {
    return this.marvelRepository.getCollections();
  }
}
