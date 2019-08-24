import { Collection } from '../../Entities/Collection';
import { Comic } from '../../Entities/Comic';

export interface IScrapingCollection {
  link: string;
  collection: Collection;
}

export interface ScrapingRepository {
  getCollections: () => Promise<IScrapingCollection[]>;
  getComics: (url: string) => Promise<Comic[]>;
  getComic: (url: string) => Promise<Comic>;
}
