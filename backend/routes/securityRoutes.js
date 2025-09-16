import { Router } from 'express';
import { analyzeSecurity } from '../controllers/securityController.js';

const router = Router();
router.post('/', analyzeSecurity);

export default router;
