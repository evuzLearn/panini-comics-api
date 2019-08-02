import { Domain } from 'ts-domain';

import { UseCases } from './types.inject';
import { container } from './inject';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';

const config = {};

export const domain = new Domain({
  config,
  useCases: {
    scrapingMarvelCollections: container.get<ScrapingMarvelCollectionsUseCase>(UseCases.ScrapingMarvelCollections),
  },
});
