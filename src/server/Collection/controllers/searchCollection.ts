import { Request, Response, NextFunction } from 'express';

import { AppDomain } from '../../../domain/domain';

export function searchCollection(domain: AppDomain) {
  return async function(req: Request, res: Response, next: NextFunction) {
    const name = req.query.name;
    if (!name) {
      next('Filter name is required');
    }
    try {
      const collections = await domain.get({ useCase: 'searchCollection' }).execute(name);
      res.send({ collections });
    } catch (err) {
      next(`Collection ${name} doesn't exist`);
    }
  };
}
