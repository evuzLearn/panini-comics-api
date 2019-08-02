export interface ScrapingRepository {
  getCollections: () => Promise<any[]>;
}
