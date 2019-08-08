import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';

import { Services } from '../../types.inject';

export class InitDatabaseUseCase implements IUseCase {
  constructor(@inject(Services.InitDatabase) private service: IService) {}

  execute(): Promise<any> {
    return this.service.execute();
  }
}
