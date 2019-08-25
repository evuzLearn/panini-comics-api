import { DepInjection } from 'depsin';
import got from 'got';

import { Repositories, Services, UseCases, Utils } from './types.inject';

import { config } from './config';
import { PaniniScrapingRepository } from './Scraping/Repositories/PaniniScrapingRepository';
import { MongoDatabaseRepository } from './Database/Repositories/MongoDatabaseRepository';
import { MockDatabaseRepository } from './Database/Repositories/MockDatabaseRepository';
import { MockScrapingRepository } from './Scraping/Repositories/MockScrapingRepository';

import { ScrapingMarvelCollectionsService } from './Scraping/Services/ScrapingMarvelCollectionsService';
import { InitDatabaseService } from './Database/Services/InitDatabaseService';
import { SaveComicService } from './Database/Services/SaveComicService';
import { SaveCollectionService } from './Database/Services/SaveCollectionService';
import { GetCollectionByIdService } from './Database/Services/GetCollectionByIdService';
import { SearchCollectionService } from './Database/Services/SearchCollectionService';
import { GetComicByIdService } from './Database/Services/GetComicByIdService';

import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';
import { InitDatabaseUseCase } from './Database/UseCases/InitDatabaseUseCase';
import { SaveComicUseCase } from './Database/UseCases/SaveComicUseCase';
import { SaveCollectionUseCase } from './Database/UseCases/SaveCollectionUseCase';
import { GetCollectionByIdUseCase } from './Database/UseCases/GetCollectionByIdUseCase';
import { SearchCollectionUseCase } from './Database/UseCases/SearchCollectionUseCase';
import { GetComicByIdUseCase } from './Database/UseCases/GetComicByIdUseCase';

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
  .register(Services.SaveCollection, SaveCollectionService)
  .register(UseCases.SaveCollection, SaveCollectionUseCase)
  .register(Services.SearchCollection, SearchCollectionService)
  .register(UseCases.SearchCollection, SearchCollectionUseCase)
  .register(Services.GetCollectionById, GetCollectionByIdService)
  .register(UseCases.GetCollectionById, GetCollectionByIdUseCase)
  .register(Services.SaveComic, SaveComicService)
  .register(UseCases.SaveComic, SaveComicUseCase)
  .register(Services.GetComicById, GetComicByIdService)
  .register(UseCases.GetComicById, GetComicByIdUseCase);
