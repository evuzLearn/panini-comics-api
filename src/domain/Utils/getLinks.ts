import cheerio from 'cheerio';

export interface Link {
  link: string;
  text: string;
}

export function getLinks($links: Cheerio): Link[] {
  const links: Link[] = [];
  $links.each((_, $link) => links.push({ link: $link.attribs.href, text: cheerio($link).text() }));
  return links;
}
