import { DepInjection } from 'depsin';

import { Repositories, Services, UseCases } from './types.inject';

import { PaniniScrapingRepository } from './Scraping/Repositories/PaniniScrapingRepository';
import { ScrapingMarvelCollectionsService } from './Scraping/Services/ScrapingMarvelCollectionsService';
import { ScrapingMarvelCollectionsUseCase } from './Scraping/UseCases/ScrapingMarvelCollectionsUseCase';

export const container = new DepInjection()
  .register(Repositories.ScrapingMarvel, PaniniScrapingRepository)
  .register(Services.ScrapingMarvelCollections, ScrapingMarvelCollectionsService)
  .register(UseCases.ScrapingMarvelCollections, ScrapingMarvelCollectionsUseCase);
