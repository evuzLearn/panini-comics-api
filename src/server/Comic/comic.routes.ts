import express from 'express';

import { domain } from '../../domain/domain';
import { getComicById } from './controllers/getComicById';

const router = express.Router();

router.get('/:id', getComicById(domain));

export const comicRouter = router;
