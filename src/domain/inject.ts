import { DepInjection } from 'depsin';
import got from 'got';

import { Repositories, Services, UseCases, Utils } from './types.inject';

import { PaniniScrapingRepository } from './Scraping/Repositories/PaniniScrapingRepository';
import { ScrapingMarvelCollectionsService } from './Scraping/Services/ScrapingMarvelCollectionsService';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';

export const container = new DepInjection()
  .set(Utils.got, got)
  .register(Repositories.ScrapingMarvel, PaniniScrapingRepository)
  .register(Services.ScrapingMarvelCollections, ScrapingMarvelCollectionsService)
  .register(UseCases.ScrapingMarvelCollections, ScrapingMarvelCollectionsUseCase);
