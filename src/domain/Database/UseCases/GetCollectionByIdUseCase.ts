import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';

import { Services } from '../../types.inject';
import { Collection } from '../../Entities/Collection';

export class GetCollectionByIdUseCase implements IUseCase {
  constructor(@inject(Services.GetCollectionById) private service: IService) {}
  execute(id): Promise<Collection> {
    return this.service.execute(id);
  }
}
