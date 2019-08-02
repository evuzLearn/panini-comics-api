import { domain } from './domain/domain';

domain
  .get({ useCase: 'scrapingMarvelCollections' })
  .execute()
  .then(e => {
    console.log(e);
  });
