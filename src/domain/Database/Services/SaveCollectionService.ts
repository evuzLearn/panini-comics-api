import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories } from '../../types.inject';
import { DatabaseRepository } from '../Repositories/DatabaseRepository';
import { Collection } from '../../Entities/Collection';

export class SaveCollectionService implements IService {
  constructor(@inject(Repositories.Database) private repository: DatabaseRepository) {}

  execute(collection: Collection): Promise<Collection> {
    return this.repository.saveCollection(collection);
  }
}
