import { Collection } from './Collection';

export interface Comic {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  authors: string[];
  pages: number;
  price: number;
  releaseDate: number;
  serie?: Collection;
}
