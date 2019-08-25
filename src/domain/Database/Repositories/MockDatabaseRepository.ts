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
    console.log('Collection:', this.collections.keys());
    return Promise.resolve(collection);
  }

  saveComic(comic: Comic): Promise<Comic> {
    this.comics.set(this.idGenerator(), comic);
    console.log('Comic:', this.comics.keys());
    return Promise.resolve(comic);
  }

  getCollectionById(id): Promise<Collection> {
    if (!this.collections.has(id)) {
      return Promise.reject();
    }
    return Promise.resolve(this.collections.get(id));
  }

  getComicById(id): Promise<Comic> {
    if (!this.comics.has(id)) {
      return Promise.reject();
    }
    return Promise.resolve(this.comics.get(id));
  }

  searchCollection(name: string): Promise<Collection[]> {
    return Promise.resolve(Array.from(this.collections.values()).filter(collection => collection.name.includes(name)));
  }

  searchComic(title: string): Promise<Comic[]> {
    return Promise.resolve(Array.from(this.comics.values()).filter(comic => comic.title.includes(title)));
  }

  private idGenerator(): string {
    return Math.random()
      .toString(36)
      .substring(2, 15);
  }
}
