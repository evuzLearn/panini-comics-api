import { DatabaseRepository } from './DatabaseRepository';
import { Collection } from '../../Entities/Collection';
import { Comic } from '../../Entities/Comic';

export class MockDatabaseRepository implements DatabaseRepository {
  private collections = new Map<string, Collection>();
  private comics = new Map<string, Comic>();

  init(): Promise<any> {
    return Promise.resolve();
  }

  saveCollection(collection: Collection): Promise<Collection> {
    this.collections.set(this.idGenerator(), collection);
    console.log(this.collections.keys());
    return Promise.resolve(collection);
  }

  saveComic(comic: Comic): Promise<Comic> {
    this.comics.set(this.idGenerator(), comic);
    return Promise.resolve(comic);
  }

  getCollectionById(id): Promise<Collection> {
    if (!this.collections.has(id)) {
      return Promise.reject();
    }
    return Promise.resolve(this.collections.get(id));
  }

  private idGenerator(): string {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  }
}