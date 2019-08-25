import { Request, Response, NextFunction } from 'express';

import { AppDomain } from '../../../domain/domain';

export function searchComic(domain: AppDomain) {
  return async function(req: Request, res: Response, next: NextFunction) {
    const title = req.query.title;
    if (!title) {
      next('Filter title is required');
    }
    try {
      const collections = await domain.get({ useCase: 'searchComic' }).execute(title);
      res.send({ collections });
    } catch (err) {
      next(`Comic ${title} doesn't exist`);
    }
  };
}
