//server/attendence-service/src/controllers/attendance.controller.ts
import { Response } from 'express';
import { attendanceService } from '../services/attendance.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ResponseUtil } from '../utils/response.util';

export class AttendanceController {
  async markAttendance(req: AuthRequest, res: Response) {
    try {
      const { qrToken } = req.body;
      const studentId = req.user!.id;

      const attendance = await attendanceService.markAttendance({
        studentId,
        qrToken,
        scannedAt: new Date(),
      });

      return ResponseUtil.success(res, attendance, 'Attendance marked successfully');
    } catch (error: any) {
      console.error('Mark attendance error:', error);
      return ResponseUtil.error(res, error.message);
    }
  }

  async getAttendanceReport(req: AuthRequest, res: Response) {
    try {
      const { courseId, date } = req.query;

      if (!courseId || !date) {
        return ResponseUtil.error(res, 'Course ID and date are required');
      }

      const report = await attendanceService.getAttendanceReport(
        courseId as string,
        new Date(date as string)
      );

      return ResponseUtil.success(res, report, 'Attendance report fetched successfully');
    } catch (error: any) {
      console.error('Get attendance report error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }

  async getStudentAttendance(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.role === 'STUDENT' ? req.user!.id : req.params.studentId;
      const { courseId } = req.query;

      if (!studentId) {
        return ResponseUtil.error(res, 'Student ID is required');
      }

      const attendance = await attendanceService.getStudentAttendance(
        studentId as string,
        courseId as string | undefined
      );

      return ResponseUtil.success(res, attendance, 'Student attendance fetched successfully');
    } catch (error: any) {
      console.error('Get student attendance error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }
}

export const attendanceController = new AttendanceController();
