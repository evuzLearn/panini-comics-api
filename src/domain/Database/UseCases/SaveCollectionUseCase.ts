import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';
import { Services } from '../../types.inject';
import { Collection } from '../../Entities/Collection';

export class SaveCollectionUseCase implements IUseCase {
  constructor(@inject(Services.InitDatabase) private service: IService) {}
  execute(collection: Collection): Promise<Collection> {
    return this.service.execute(collection);
  }
}
