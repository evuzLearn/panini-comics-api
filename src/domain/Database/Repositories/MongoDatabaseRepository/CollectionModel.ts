import mongoose, { Document, Schema } from 'mongoose';

import { Collection } from '../../../Entities/Collection';
import { ComicModel } from './ComicModel';

interface ICollection extends Collection, Document {}

const collectionSchema = new mongoose.Schema<ICollection>({
  name: String,
  comics: { type: [], default: undefined },
});

collectionSchema.pre('save', function() {
  const collection = <ICollection>this;
  collection.comics = undefined;
});

export const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
