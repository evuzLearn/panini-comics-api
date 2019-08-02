import { ScrapingRepository } from './ScrapingRepository';

export class PaniniScrapingRepository implements ScrapingRepository {
  getCollections() {
    return Promise.resolve([{ name: 'Spiderman' }]);
  }
}
