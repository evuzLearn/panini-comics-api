import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';
import { Services } from '../../types.inject';
import { Collection } from '../../Entities/Collection';

export class ScrapingMarvelCollectionsUseCase implements IUseCase {
  constructor(@inject(Services.ScrapingMarvelCollections) private service: IService) {}

  execute(): Promise<Collection[]> {
    return this.service.execute();
  }
}
