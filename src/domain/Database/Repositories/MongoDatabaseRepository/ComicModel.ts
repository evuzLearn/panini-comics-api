import mongoose, { Document, Schema } from 'mongoose';

import { Comic } from '../../../Entities/Comic';

interface IComic extends Comic, Document {}

const comicSchema = new mongoose.Schema<IComic>({
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
});

export const ComicModel = mongoose.model<IComic>('Comic', comicSchema);
