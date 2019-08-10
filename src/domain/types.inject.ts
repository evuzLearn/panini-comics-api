export const Repositories = {
  ScrapingMarvel: 'ScrapingMarvelRepository',
  Database: 'DatabaseRepository',
};

export const Services = {
  ScrapingMarvelCollections: 'ScrapingMarvelCollectionsService',
  InitDatabase: 'InitDatabaseService',
  SaveComic: 'SaveComicService',
  SaveCollection: 'SaveCollectionService',
  GetCollectionById: 'GetCollectionByIdService',
};

export const UseCases = {
  ScrapingMarvelCollections: 'ScrapingMarvelCollectionsUseCase',
  InitDatabase: 'InitDatabaseUseCase',
  SaveComic: 'SaveComicUseCase',
  SaveCollection: 'SaveCollectionUseCase',
  GetCollectionById: 'GetCollectionByIdUseCase',
};

export const Utils = {
  got: 'got',
  cheerio: 'cheerio',
  config: 'config',
};
