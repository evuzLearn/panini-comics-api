import mongoose, { Document, Schema } from 'mongoose';

import { Comic } from '../../../Entities/Comic';

export interface IComic extends Omit<Comic, 'id'>, Document {}

const comicSchema = new mongoose.Schema<IComic>({
  id: { type: String, unique: true, index: true },
  title: String,
  subtitle: String,
  description: String,
  image: String,
  authors: [String],
  pages: Number,
  price: Number,
  releaseDate: Number,
});

comicSchema.set('toJSON', {
  versionKey: false,
  transform: function(_, ret) {
    delete ret._id;
  },
});

export const ComicModel = mongoose.model<IComic>('Comic', comicSchema);
