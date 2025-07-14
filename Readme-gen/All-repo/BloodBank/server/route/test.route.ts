import { TestRoute } from '../controller/test.controller';

import { Router } from 'express';
const router = Router();

router.get('/', TestRoute);

export default router;
