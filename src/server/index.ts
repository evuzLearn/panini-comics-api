import { Server } from './Server';
import { collectionRouter } from './Collection/collection.routes';
import { comicRouter } from './Comic/comic.routes';

export const server = new Server({ collection: collectionRouter, comic: comicRouter });
