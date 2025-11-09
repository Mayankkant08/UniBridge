// src/routes/qr.routes.ts

import { Router } from 'express';
import { qrController } from '../controllers/qr.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { validateRequest, generateQRSchema } from '../middlewares/validate.middleware';

const router = Router();

router.post(
  '/generate',
  authMiddleware,
  roleMiddleware('TEACHER'),
  validateRequest(generateQRSchema),
  qrController.generateQR.bind(qrController)
);

router.post(
  '/regenerate',
  authMiddleware,
  roleMiddleware('TEACHER'),
  validateRequest(generateQRSchema),
  qrController.regenerateQR.bind(qrController)
);

export default router;
