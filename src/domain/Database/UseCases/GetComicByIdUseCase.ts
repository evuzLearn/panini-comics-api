import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';

import { Services } from '../../types.inject';
import { Comic } from '../../Entities/Comic';

export class GetComicByIdUseCase implements IUseCase {
  constructor(@inject(Services.GetComicById) private service: IService) {}
  execute(id): Promise<Comic> {
    return this.service.execute(id);
  }
}
