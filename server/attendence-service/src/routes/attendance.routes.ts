import { Router } from 'express';
import { attendanceController } from '../controllers/attendance.controller';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.middleware';
import { validateRequest, markAttendanceSchema } from '../middlewares/validate.middleware';

const router = Router();

router.post(
  '/mark',
  authMiddleware,
  roleMiddleware('STUDENT'),
  validateRequest(markAttendanceSchema),
  attendanceController.markAttendance.bind(attendanceController)
);

router.get(
  '/report',
  authMiddleware,
  roleMiddleware('TEACHER', 'WARDEN'),
  attendanceController.getAttendanceReport.bind(attendanceController)
);

router.get(
  '/student/:studentId?',
  authMiddleware,
  roleMiddleware('STUDENT', 'PARENT', 'WARDEN', 'TEACHER'),
  attendanceController.getStudentAttendance.bind(attendanceController)
);

export default router; // ← Changed from export const attendanceRoutes
