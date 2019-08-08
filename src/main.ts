import { domain } from './domain/domain';

domain
  .get({ useCase: 'initDatabase' })
  .execute()
  .then(e => {
    console.log('Database connected');
    return domain.get({ useCase: 'scrapingMarvelCollections' }).execute();
  })
  .then(() => {
    console.log('END');
  })
  .catch(err => console.error(err));
