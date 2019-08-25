import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';

import { Services } from '../../types.inject';
import { Comic } from '../../Entities/Comic';

export class SearchComicUseCase implements IUseCase {
  constructor(@inject(Services.SearchComic) private service: IService) {}
  execute(title: string): Promise<Comic[]> {
    return this.service.execute(title);
  }
}
