"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = exports.AttendanceController = void 0;
const attendance_service_1 = require("../services/attendance.service");
const response_util_1 = require("../utils/response.util");
class AttendanceController {
    async markAttendance(req, res) {
        try {
            const { qrToken } = req.body;
            const studentId = req.user.id;
            const attendance = await attendance_service_1.attendanceService.markAttendance({
                studentId,
                qrToken,
                scannedAt: new Date(),
            });
            return response_util_1.ResponseUtil.success(res, attendance, 'Attendance marked successfully');
        }
        catch (error) {
            console.error('Mark attendance error:', error);
            return response_util_1.ResponseUtil.error(res, error.message);
        }
    }
    async getAttendanceReport(req, res) {
        try {
            const { courseId, date } = req.query;
            if (!courseId || !date) {
                return response_util_1.ResponseUtil.error(res, 'Course ID and date are required');
            }
            const report = await attendance_service_1.attendanceService.getAttendanceReport(courseId, new Date(date));
            return response_util_1.ResponseUtil.success(res, report, 'Attendance report fetched successfully');
        }
        catch (error) {
            console.error('Get attendance report error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
    async getStudentAttendance(req, res) {
        try {
            const studentId = req.user.role === 'STUDENT' ? req.user.id : req.params.studentId;
            const { courseId } = req.query;
            if (!studentId) {
                return response_util_1.ResponseUtil.error(res, 'Student ID is required');
            }
            const attendance = await attendance_service_1.attendanceService.getStudentAttendance(studentId, courseId);
            return response_util_1.ResponseUtil.success(res, attendance, 'Student attendance fetched successfully');
        }
        catch (error) {
            console.error('Get student attendance error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
}
exports.AttendanceController = AttendanceController;
exports.attendanceController = new AttendanceController();
//# sourceMappingURL=attendance.controller.js.map