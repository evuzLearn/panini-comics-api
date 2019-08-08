import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories } from '../../types.inject';
import { DatabaseRepository } from '../Repositories/DatabaseRepository';
import { Comic } from '../../Entities/Comic';

export class SaveComicService implements IService {
  constructor(@inject(Repositories.Database) private repository: DatabaseRepository) {}

  execute(comic: Comic): Promise<Comic> {
    return this.repository.saveComic(comic);
  }
}
