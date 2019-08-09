import { domain } from './domain/domain';
import { ComicModel } from './domain/Database/Repositories/MongoDatabaseRepository/ComicModel';
import { CollectionModel } from './domain/Database/Repositories/MongoDatabaseRepository/CollectionModel';

domain
  .get({ useCase: 'initDatabase' })
  .execute()
  .then(e => {
    console.log('Database connected');
    return domain.get({ useCase: 'scrapingMarvelCollections' }).execute();
  })
  .then(result => {
    console.log('Result', result);
  })
  .catch(err => console.error(err));
