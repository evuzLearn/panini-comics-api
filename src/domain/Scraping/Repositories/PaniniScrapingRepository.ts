import { GotInstance } from 'got';
import { inject } from 'depsin';
import cheerio from 'cheerio';

import { ScrapingRepository } from './ScrapingRepository';
import { Utils } from '../../types.inject';
import { getLinks } from '../../Utils/getLinks';
import { cleanString } from '../../Utils/cleanString';
import { Comic } from '../../Entities/Comic';

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
      return collectionsLinks.map(collection => {
        const url = new URL(collection.link);
        const id = url.searchParams.get('pnn_collana_edicola');
        return {
          link: collection.link,
          collection: { id, name: collection.text, comics: [] },
        };
      });
    });
  }

  getComics(link: string) {
    const url = new URL(link);
    url.searchParams.set('limit', '25');
    url.searchParams.set('order', 'pnn_data_uscita');
    url.searchParams.set('dir', 'asc');

    return this.got(url.href)
      .then(async res => {
        let comics: Comic[] = [];
        const $ = cheerio.load(res.body);
        const [next] = getLinks($('.list-pager .pagination li > a.next'));
        if (next) {
          comics = await this.getComics(next.link);
        }
        return { comics, links: getLinks($('#products-list .item .product-name > a')) };
      })
      .then(({ comics, links }) => {
        return Promise.all(links.map(comicLink => this.getComic(comicLink.link))).then(newComics => {
          return newComics.concat(comics);
        });
      });
  }

  getComic(url: string) {
    return this.got(url).then(res => {
      const $ = cheerio.load(res.body);
      const id = /\d+/.exec($('.price-container .price').attr().id)[0];
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
        id,
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
  }
}
