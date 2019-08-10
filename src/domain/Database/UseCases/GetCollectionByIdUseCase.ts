import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';
import { Services } from '../../types.inject';

export class GetCollectionByIdUseCase implements IUseCase {
  constructor(@inject(Services.GetCollectionById) private service: IService) {}
  execute(id) {
    return this.service.execute(id);
  }
}
