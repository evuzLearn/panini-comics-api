import { Domain } from 'ts-domain';

import { UseCases, Utils } from './types.inject';
import { container } from './inject';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';

export const domain = new Domain({
  config: container.get<any>(Utils.config),
  useCases: {
    scrapingMarvelCollections: container.get<ScrapingMarvelCollectionsUseCase>(UseCases.ScrapingMarvelCollections),
  },
});
