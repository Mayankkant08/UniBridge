import { MarkAttendanceRequest, AttendanceRecord } from '../types';
export declare class AttendanceService {
    initializeAttendance(courseId: string, studentIds: string[], teacherId: string, classDate?: Date): Promise<void>;
    markAttendance(request: MarkAttendanceRequest): Promise<AttendanceRecord>;
    getAttendanceReport(courseId: string, date: Date): Promise<AttendanceRecord[]>;
    getStudentAttendance(studentId: string, courseId?: string): Promise<AttendanceRecord[]>;
}
export declare const attendanceService: AttendanceService;
//# sourceMappingURL=attendance.service.d.ts.map