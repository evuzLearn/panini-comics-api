import { Collection } from '../../Entities/Collection';
import { Comic } from '../../Entities/Comic';

export interface DatabaseRepository {
  init(): Promise<any>;
  saveCollection(collection: Collection): Promise<Collection>;
  saveComic(comic: Comic): Promise<Comic>;
}
