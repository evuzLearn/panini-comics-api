import { GotInstance } from 'got';
import { inject } from 'depsin';
import cheerio from 'cheerio';

import { ScrapingRepository } from './ScrapingRepository';
import { Utils } from '../../types.inject';
import { getLinks } from '../../Utils/getLinks';
import { cleanString } from '../../Utils/cleanString';

const URL_COLLECTIONS = 'http://comics.panini.es/colecciones/';

function dateToTime(date: string) {
  const [day, month, year] = date.split('/');
  return new Date(+year, +month - 1, +day).getTime();
}

export class PaniniScrapingRepository implements ScrapingRepository {
  constructor(@inject(Utils.got) private got: GotInstance) {}
  getCollections() {
    return this.got(URL_COLLECTIONS).then(res => {
      const $ = cheerio.load(res.body);
      const collectionsLinks = getLinks($('#content li > a'));
      collectionsLinks.shift(); // Remove "Ofertas especiales"
      return collectionsLinks.map(collecion => {
        return {
          link: collecion.link,
          collection: { id: null, name: collecion.text, comics: [] },
        };
      });
    });
  }

  getComics(url: string) {
    return this.got(url)
      .then(res => {
        const $ = cheerio.load(res.body);
        return getLinks($('#products-list .item .product-name > a'));
      })
      .then(comicsLinks => {
        return Promise.all(
          comicsLinks.map(comicLink => {
            return this.got(comicLink.link).then(res => {
              const $ = cheerio.load(res.body);
              const subtitle = cleanString($('.productDetailHeader h1 > .subtitle').text());
              const title = cleanString(
                $('.productDetailHeader h1')
                  .text()
                  .replace(subtitle, ''),
              );
              const description = cleanString($('#description').text());
              const image = $('.product-image img').attr().src;
              const authors = cleanString($('.productDetailInfo #authors .content').text()).split(', ');
              const pages = +cleanString($('.productDetailInfo #pages .content').text()).replace(/\D+/g, '');
              const price = +cleanString($('.price-box .old-price .price').text())
                .replace(/[^0-9.,]+/g, '')
                .replace(',', '.');
              const releaseDate = dateToTime($('#data-pubblicazione h3').text());
              return {
                id: null,
                title,
                subtitle,
                description,
                image,
                authors,
                pages,
                price,
                releaseDate,
              };
            });
          }),
        );
      });
  }
}
