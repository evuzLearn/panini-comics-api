import { IService } from 'ts-domain';
import { inject } from 'depsin';

import { Repositories } from '../../types.inject';
import { DatabaseRepository } from '../Repositories/DatabaseRepository';
import { Comic } from '../../Entities/Comic';

export class SearchComicService implements IService {
  constructor(@inject(Repositories.Database) private repository: DatabaseRepository) {}

  execute(title: string): Promise<Comic[]> {
    return this.repository.searchComic(title);
  }
}
