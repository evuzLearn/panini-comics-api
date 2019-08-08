import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';
import { Services } from '../../types.inject';
import { Comic } from '../../Entities/Comic';

export class SaveComicUseCase implements IUseCase {
  constructor(@inject(Services.InitDatabase) private service: IService) {}
  execute(comic: Comic): Promise<Comic> {
    return this.service.execute(comic);
  }
}
