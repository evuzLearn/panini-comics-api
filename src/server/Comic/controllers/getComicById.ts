import { Request, Response, NextFunction } from 'express';

import { AppDomain } from '../../../domain/domain';

export function getComicById(domain: AppDomain) {
  return async function(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    if (!id) {
      next('Param id is neccesary');
    }
    try {
      const collection = await domain.get({ useCase: 'getComicById' }).execute(id);
      res.send({ collection });
    } catch (err) {
      next(`Comic ${id} doesn't exist`);
    }
  };
}
