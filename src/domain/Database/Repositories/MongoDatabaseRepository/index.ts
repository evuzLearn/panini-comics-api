import mongoose from 'mongoose';
import { inject } from 'depsin';

import { DatabaseRepository } from '../DatabaseRepository';
import { Collection } from '../../../Entities/Collection';
import { Comic } from '../../../Entities/Comic';
import { Utils } from '../../../types.inject';
import { ComicModel } from './ComicModel';
import { CollectionModel } from './CollectionModel';
import { Config } from '../../../config';

export class MongoDatabaseRepository implements DatabaseRepository {
  private get db() {
    const { db_url } = this.config;
    if (!db_url) {
      throw Error('A db configuration parameter is required.');
    }
    return `mongodb://${db_url}`;
  }

  constructor(@inject(Utils.config) private config: Config) {}

  init() {
    return mongoose.connect(this.db, { useNewUrlParser: true }).then(async con => {
      if (this.config.drop_db) {
        await con.connection.db.dropDatabase();
        console.log('DB is dropped');
      }
      return con;
    });
  }

  async saveCollection(collection: Collection) {
    const model = new CollectionModel(collection);
    const doc = await model.save();
    return doc.toJSON();
  }

  async getCollectionById(id) {
    const collection = await CollectionModel.findById(id)
      .populate('comics')
      .exec();
    return collection.toJSON();
  }

  async searchCollection(name: string) {
    const collections = await CollectionModel.find({ name: new RegExp(`${name}`, 'i') })
      .populate('comics')
      .exec();
    return collections.map(collection => collection.toJSON());
  }

  async saveComic(comic: Comic) {
    const model = new ComicModel(comic);
    const doc = await model.save();
    return doc.toJSON();
  }

  async getComicById(id) {
    const comic = await ComicModel.findById(id);
    return comic.toJSON();
  }
}
