import { Request, Response, NextFunction } from 'express';

import { AppDomain } from '../../../domain/domain';

export function getCollectionById(domain: AppDomain) {
  return async function(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!id) {
      next('Param id is neccesary');
    }
    try {
      const collection = await domain.get({ useCase: 'getCollectionById' }).execute(id);
      res.send({ collection });
    } catch (err) {
      next(`Collection ${id} doesn't exist`);
    }
  };
}
