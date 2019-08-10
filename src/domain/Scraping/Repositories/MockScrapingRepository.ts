import faker from 'faker';

import { ScrapingRepository, IScrapingCollection } from './ScrapingRepository';
import { Comic } from '../../Entities/Comic';

export class MockScrapingRepository implements ScrapingRepository {
  getCollections(): Promise<IScrapingCollection[]> {
    return Promise.resolve(
      Array.from({ length: 5 }).map(() => {
        return {
          link: faker.internet.url(),
          collection: {
            name: faker.hacker.noun(),
            comics: [],
          },
        };
      }),
    );
  }

  getComics(): Promise<Comic[]> {
    const length = Math.floor(Math.random() * 5 + 1);
    const pages = Math.floor(Math.random() * 12 + 1);
    return Promise.resolve(
      Array.from({ length }).map(() => {
        return {
          title: `${faker.hacker.verb()} ${faker.hacker.abbreviation()}`,
          subtitle: faker.hacker.phrase(),
          description: faker.lorem.paragraph(),
          image: faker.image.cats(),
          authors: [faker.name.findName()],
          pages: 24 * pages,
          price: +faker.commerce.price(0, 34),
          releaseDate: faker.date.past().getTime(),
        };
      }),
    );
  }
}