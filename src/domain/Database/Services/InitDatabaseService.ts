import { IService } from 'ts-domain';
import { inject } from 'depsin';
import { Repositories } from '../../types.inject';
import { DatabaseRepository } from '../Repositories/DatabaseRepository';

export class InitDatabaseService implements IService {
  constructor(@inject(Repositories.Database) private repository: DatabaseRepository) {}
  execute() {
    return this.repository.init();
  }
}
