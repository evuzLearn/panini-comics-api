import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';

import { Services } from '../../types.inject';
import { Collection } from '../../Entities/Collection';

export class SearchCollectionUseCase implements IUseCase {
  constructor(@inject(Services.SearchCollection) private service: IService) {}
  execute(name: string): Promise<Collection[]> {
    return this.service.execute(name);
  }
}
