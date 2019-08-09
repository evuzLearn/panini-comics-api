import mongoose, { Document, Schema } from 'mongoose';

import { Collection } from '../../../Entities/Collection';

interface ICollection extends Collection, Document {}

const collectionSchema = new mongoose.Schema<ICollection>({
  name: String,
  comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
});

export const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
