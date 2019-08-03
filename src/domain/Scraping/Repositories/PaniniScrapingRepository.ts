import { GotInstance } from 'got';
import { inject } from 'depsin';
import cheerio from 'cheerio';

import { ScrapingRepository } from './ScrapingRepository';
import { Utils } from '../../types.inject';
import { getLinks } from '../../Utils/getLinks';
import { Collection } from '../../Entities/Collection';

const URL_COLLECTIONS = 'http://comics.panini.es/colecciones/';

export class PaniniScrapingRepository implements ScrapingRepository {
  constructor(@inject(Utils.got) private got: GotInstance) {}
  getCollections() {
    const collections: Collection[] = [];
    return this.got(URL_COLLECTIONS)
      .then(res => {
        const $ = cheerio.load(res.body);
        const collectionsLinks = getLinks($('#content li > a'));
        collectionsLinks.pop(); // Remove "Ofertas especiales"
        return collectionsLinks.slice(1, 2);
      })
      .then(collectionsLinks => {
        return Promise.all(
          collectionsLinks.map(collection => {
            return this.got(collection.link).then(res => {
              const $ = cheerio.load(res.body);
              const comicLinks = getLinks($('#products-list .item .product-name > a'));
              return comicLinks;
            });
          }),
        );
      });
  }
}
