import express from 'express';

import { domain } from '../../domain/domain';
import { getCollectionById } from './controllers/getCollectionById';
import { searchCollection } from './controllers/searchCollection';

const router = express.Router();

router.get('/search', searchCollection(domain));
router.get('/:id', getCollectionById(domain));

export const collectionRouter = router;
