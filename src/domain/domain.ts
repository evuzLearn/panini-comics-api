import { Domain } from 'ts-domain';

import { UseCases, Utils } from './types.inject';
import { container } from './inject';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';
import { InitDatabaseUseCase } from './Database/UseCases/InitDatabaseUseCase';
import { GetCollectionByIdUseCase } from './Database/UseCases/GetCollectionByIdUseCase';
import { SearchCollectionUseCase } from './Database/UseCases/SearchCollectionUseCase';
import { GetComicByIdUseCase } from './Database/UseCases/GetComicByIdUseCase';
import { SearchComicUseCase } from './Database/UseCases/SearchComicUseCase';

export const domain = new Domain({
  config: container.get<any>(Utils.config),
  useCases: {
    scrapingMarvelCollections: container.get<ScrapingMarvelCollectionsUseCase>(UseCases.ScrapingMarvelCollections),
    initDatabase: container.get<InitDatabaseUseCase>(UseCases.InitDatabase),
    getCollectionById: container.get<GetCollectionByIdUseCase>(UseCases.GetCollectionById),
    searchCollection: container.get<SearchCollectionUseCase>(UseCases.SearchCollection),
    getComicById: container.get<GetComicByIdUseCase>(UseCases.GetComicById),
    searchComic: container.get<SearchComicUseCase>(UseCases.SearchComic),
  },
});

export type AppDomain = typeof domain;
