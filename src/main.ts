import util from 'util';

import { domain } from './domain/domain';
import { server } from './server';

domain
  .get({ useCase: 'initDatabase' })
  .execute()
  .then(e => {
    console.log('Database connected');
    return domain.get({ useCase: 'scrapingMarvelCollections' }).execute();
  })
  .then(result => {
    console.log('Result', util.inspect(result, { depth: 3, colors: true }));
    return server.start();
  })
  .catch(err => console.error(err));
