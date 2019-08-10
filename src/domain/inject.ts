import { DepInjection } from 'depsin';
import got from 'got';

import { Repositories, Services, UseCases, Utils } from './types.inject';

import { PaniniScrapingRepository } from './Scraping/Repositories/PaniniScrapingRepository';
import { MongoDatabaseRepository } from './Database/Repositories/MongoDatabaseRepository';
import { MockDatabaseRepository } from './Database/Repositories/MockDatabaseRepository';
import { MockScrapingRepository } from './Scraping/Repositories/MockScrapingRepository';
import { ScrapingMarvelCollectionsService } from './Scraping/Services/ScrapingMarvelCollectionsService';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';
import { InitDatabaseService } from './Database/Services/InitDatabaseService';
import { InitDatabaseUseCase } from './Database/UseCases/InitDatabaseUseCase';
import { SaveComicService } from './Database/Services/SaveComicService';
import { SaveComicUseCase } from './Database/UseCases/SaveComicUseCase';
import { SaveCollectionService } from './Database/Services/SaveCollectionService';
import { SaveCollectionUseCase } from './Database/UseCases/SaveCollectionUseCase';
import { config } from './config';

const useMock = config.mock;
const scrapingMarvelRepository: any = useMock ? MockScrapingRepository : PaniniScrapingRepository;
const databaseRepository: any = useMock ? MockDatabaseRepository : MongoDatabaseRepository;

export const container = new DepInjection()
  .set(Utils.got, got)
  .set(Utils.config, config)
  .register(Repositories.ScrapingMarvel, scrapingMarvelRepository)
  .register(Repositories.Database, databaseRepository)
  .register(Services.ScrapingMarvelCollections, ScrapingMarvelCollectionsService)
  .register(UseCases.ScrapingMarvelCollections, ScrapingMarvelCollectionsUseCase)
  .register(Services.InitDatabase, InitDatabaseService)
  .register(UseCases.InitDatabase, InitDatabaseUseCase)
  .register(Services.SaveComic, SaveComicService)
  .register(UseCases.SaveComic, SaveComicUseCase)
  .register(Services.SaveCollection, SaveCollectionService)
  .register(UseCases.SaveCollection, SaveCollectionUseCase);
