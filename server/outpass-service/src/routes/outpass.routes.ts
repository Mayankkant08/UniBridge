import { Router } from 'express';
import { outpassController } from '../controllers/outpass.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { validateRequest, createOutpassSchema, approvalSchema, cancelOutpassSchema } from '../middlewares/validate.middleware';

const router = Router();

// Student routes
router.post(
  '/create',
  authMiddleware,
  roleMiddleware('STUDENT'),
  validateRequest(createOutpassSchema),
  outpassController.createOutpass.bind(outpassController)
);

router.post(
  '/:outpassId/cancel',
  authMiddleware,
  roleMiddleware('STUDENT'),
  validateRequest(cancelOutpassSchema),
  outpassController.cancelOutpass.bind(outpassController)
);

router.get(
  '/my-outpasses',
  authMiddleware,
  roleMiddleware('STUDENT'),
  outpassController.getStudentOutpasses.bind(outpassController)
);

// Parent routes
router.get(
  '/pending/parent',
  authMiddleware,
  roleMiddleware('PARENT'),
  outpassController.getPendingForParent.bind(outpassController)
);

router.post(
  '/:outpassId/approve/parent',
  authMiddleware,
  roleMiddleware('PARENT'),
  validateRequest(approvalSchema),
  outpassController.parentApproval.bind(outpassController)
);

// Warden routes
router.get(
  '/pending/warden',
  authMiddleware,
  roleMiddleware('WARDEN'),
  outpassController.getPendingForWarden.bind(outpassController)
);

router.post(
  '/:outpassId/approve/warden',
  authMiddleware,
  roleMiddleware('WARDEN'),
  validateRequest(approvalSchema),
  outpassController.wardenApproval.bind(outpassController)
);

router.get(
  '/all',
  authMiddleware,
  roleMiddleware('WARDEN', 'TEACHER'),
  outpassController.getAllOutpasses.bind(outpassController)
);

// Common routes
router.get(
  '/student/:studentId',
  authMiddleware,
  roleMiddleware('PARENT', 'WARDEN', 'TEACHER'),
  outpassController.getStudentOutpasses.bind(outpassController)
);

export default router;
