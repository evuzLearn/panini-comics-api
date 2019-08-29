import { Comic } from './Comic';

export interface Collection {
  id: any;
  name: string;
  comics: Comic[];
}
