import { Server } from './Server';
import { collectionRouter } from './Collection/collection.routes';

export const server = new Server({ collection: collectionRouter });
