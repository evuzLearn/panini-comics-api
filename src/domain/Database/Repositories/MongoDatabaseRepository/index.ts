import mongoose from 'mongoose';
import { inject } from 'depsin';

import { DatabaseRepository } from '../DatabaseRepository';
import { Collection } from '../../../Entities/Collection';
import { Comic } from '../../../Entities/Comic';
import { Utils } from '../../../types.inject';
import { ComicModel, IComic } from './ComicModel';
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
    return mongoose.connect(this.db, { useNewUrlParser: true, useCreateIndex: true }).then(async con => {
      if (this.config.drop_db) {
        await con.connection.db.dropDatabase();
        console.log('DB is dropped');
      }
      return con;
    });
  }

  async saveCollection({ comics: c, ...collection }: Collection) {
    const comics = await Promise.all(
      c.map(comic => {
        if ((<IComic>comic)._id) {
          return Promise.resolve(comic);
        }
        return ComicModel.findOne({ id: comic.id }).then(r => <Comic>r);
      }),
    );
    const model = new CollectionModel({ comics, ...collection });
    try {
      return (await model.save()).toJSON();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return (await CollectionModel.findOne({ id: collection.id })).toJSON();
      }
    }
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
    try {
      return (await model.save()).toJSON();
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return (await ComicModel.findOne({ id: comic.id })).toJSON();
      }
      throw err;
    }
  }

  async getComicById(id) {
    const comic = await ComicModel.findById(id);
    return comic.toJSON();
  }

  async searchComic(title: string) {
    const comics = await ComicModel.find({ title: new RegExp(`${title}`, 'i') });
    return comics.map(comic => comic.toJSON());
  }
}
