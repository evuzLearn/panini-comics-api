import mongoose from 'mongoose';
import { inject } from 'depsin';

import { DatabaseRepository } from '../DatabaseRepository';
import { Collection } from '../../../Entities/Collection';
import { Comic } from '../../../Entities/Comic';
import { Utils } from '../../../types.inject';
import { ComicModel } from './ComicModel';

export class MongoDatabaseRepository implements DatabaseRepository {
  private get db() {
    if (!this.config.db) {
      throw Error('A db configuration parameter is required.');
    }
    return this.config.db;
  }
  constructor(@inject(Utils.config) private config) {}

  init() {
    return mongoose.connect(this.db, { useNewUrlParser: true });
  }

  saveCollection(collection: Collection) {
    return Promise.resolve(collection);
  }

  saveComic(comic: Comic) {
    const doc = new ComicModel(comic);
    return doc.save();
  }
}
