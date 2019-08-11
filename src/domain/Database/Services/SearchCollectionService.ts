import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories } from '../../types.inject';
import { DatabaseRepository } from '../Repositories/DatabaseRepository';
import { Collection } from '../../Entities/Collection';

export class SearchCollectionService implements IService {
  constructor(@inject(Repositories.Database) private repository: DatabaseRepository) {}

  execute(name: string): Promise<Collection[]> {
    return this.repository.searchCollection(name);
  }
}
