import { DepInjection } from 'depsin';
import got from 'got';

import { Repositories, Services, UseCases, Utils } from './types.inject';

import { PaniniScrapingRepository } from './Scraping/Repositories/PaniniScrapingRepository';
import { ScrapingMarvelCollectionsService } from './Scraping/Services/ScrapingMarvelCollectionsService';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';
import { MongoDatabaseRepository } from './Database/Repositories/MongoDatabaseRepository';
import { InitDatabaseService } from './Database/Services/InitDatabaseService';
import { InitDatabaseUseCase } from './Database/UseCases/InitDatabaseUseCase';
import { SaveComicService } from './Database/Services/SaveComicService';
import { SaveComicUseCase } from './Database/UseCases/SaveComicUseCase';

const config = {
  requestDelay: 1000,
  db: 'mongodb://localhost:27017/panini',
};

export const container = new DepInjection()
  .set(Utils.got, got)
  .set(Utils.config, config)
  .register(Repositories.ScrapingMarvel, PaniniScrapingRepository)
  .register(Repositories.Database, MongoDatabaseRepository)
  .register(Services.ScrapingMarvelCollections, ScrapingMarvelCollectionsService)
  .register(UseCases.ScrapingMarvelCollections, ScrapingMarvelCollectionsUseCase)
  .register(Services.InitDatabase, InitDatabaseService)
  .register(UseCases.InitDatabase, InitDatabaseUseCase)
  .register(Services.SaveComic, SaveComicService)
  .register(UseCases.SaveComic, SaveComicUseCase);
