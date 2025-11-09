import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
export declare class AttendanceController {
    markAttendance(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getAttendanceReport(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getStudentAttendance(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const attendanceController: AttendanceController;
//# sourceMappingURL=attendance.controller.d.ts.map