import { Domain } from 'ts-domain';

import { UseCases, Utils } from './types.inject';
import { container } from './inject';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';
import { InitDatabaseUseCase } from './Database/UseCases/InitDatabaseUseCase';
import { GetCollectionByIdUseCase } from './Database/UseCases/GetCollectionByIdUseCase';

export const domain = new Domain({
  config: container.get<any>(Utils.config),
  useCases: {
    scrapingMarvelCollections: container.get<ScrapingMarvelCollectionsUseCase>(UseCases.ScrapingMarvelCollections),
    initDatabase: container.get<InitDatabaseUseCase>(UseCases.InitDatabase),
    getCollectionById: container.get<GetCollectionByIdUseCase>(UseCases.GetCollectionById),
  },
});

export type AppDomain = typeof domain;
