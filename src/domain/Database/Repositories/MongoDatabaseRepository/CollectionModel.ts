import mongoose, { Document, Schema } from 'mongoose';

import { Collection } from '../../../Entities/Collection';

export interface ICollection extends Omit<Collection, 'id'>, Document {}

const collectionSchema = new mongoose.Schema<ICollection>({
  id: { type: String, unique: true, index: true },
  name: String,
  comics: [{ type: Schema.Types.ObjectId, ref: 'Comic' }],
});

collectionSchema.set('toJSON', {
  versionKey: false,
  transform: function(_, ret) {
    delete ret._id;
  },
});

export const CollectionModel = mongoose.model<ICollection>('Collection', collectionSchema);
