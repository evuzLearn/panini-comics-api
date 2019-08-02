import { GotInstance } from 'got';
import { inject } from 'depsin';

import { ScrapingRepository } from './ScrapingRepository';
import { Utils } from '../../types.inject';

const URL_COLLECTIONS = 'http://comics.panini.es/colecciones/';

function getLinks($links: Cheerio) {
  const links = [];
  $links.each((_, $link) => links.push($link.attribs.href));
  return links;
}

export class PaniniScrapingRepository implements ScrapingRepository {
  constructor(@inject(Utils.got) private got: GotInstance, @inject(Utils.cheerio) private cheerio: CheerioAPI) {}
  getCollections() {
    return this.got(URL_COLLECTIONS).then(res => {
      const $ = this.cheerio.load(res.body);
      const collectionsLinks = getLinks($('#content li > a'));
      return collectionsLinks;
    });
  }
}
