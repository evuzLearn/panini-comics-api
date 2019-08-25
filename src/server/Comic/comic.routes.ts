import express from 'express';

import { domain } from '../../domain/domain';
import { getComicById } from './controllers/getComicById';
import { searchComic } from './controllers/searchComic';

const router = express.Router();

router.get('/search', searchComic(domain));
router.get('/:id', getComicById(domain));

export const comicRouter = router;
