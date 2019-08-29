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
    console.log(`Found ${result.length} collections`);
    return server.start();
  })
  .catch(err => console.error(err));
