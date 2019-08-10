import express from 'express';

import { getCollectionById } from './controllers/getCollectionById';
import { domain } from '../../domain/domain';

const router = express.Router();

router.get('/', function(_, res) {
  res.send({ message: `Welcome to api!` });
});
router.get('/:id', getCollectionById(domain));

export const collectionRouter = router;
