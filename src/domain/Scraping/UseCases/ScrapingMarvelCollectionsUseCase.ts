import { IUseCase, IService } from 'ts-domain';
import { inject } from 'depsin';
import { Services } from '../../types.inject';

export class ScrapingMarvelCollectionsUseCase implements IUseCase {
  constructor(@inject(Services.ScrapingMarvelCollections) private service: IService) {}

  execute(): Promise<any[]> {
    return this.service.execute();
  }
}
