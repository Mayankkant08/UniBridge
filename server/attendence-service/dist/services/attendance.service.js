"use strict";
//server/attendence-service/src/services/attendance.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceService = exports.AttendanceService = void 0;
const database_1 = require("../config/database");
const qr_service_1 = require("./qr.service");
const outpass_check_service_1 = require("./outpass-check.service");
const publishers_1 = require("../events/publishers");
class AttendanceService {
    async initializeAttendance(courseId, studentIds, teacherId, classDate) {
        const date = classDate || new Date();
        date.setHours(0, 0, 0, 0);
        const attendanceRecords = studentIds.map((studentId) => ({
            studentId,
            courseId,
            teacherId,
            classDate: date,
            status: 'ABSENT',
        }));
        await database_1.prisma.attendance.createMany({
            data: attendanceRecords,
            skipDuplicates: true,
        });
    }
    async markAttendance(request) {
        // Validate QR code
        const qrValidation = await qr_service_1.qrService.validateQR(request.qrToken);
        if (!qrValidation.valid) {
            throw new Error(qrValidation.error || 'Invalid QR code');
        }
        const { courseId, teacherId, classDate } = qrValidation.payload;
        // Check if student is on outpass
        const outpassStatus = await outpass_check_service_1.outpassCheckService.checkStudentOutpassStatus(request.studentId);
        if (outpassStatus.isOnOutpass) {
            throw new Error(`Cannot mark attendance. You are currently on outpass until ${outpassStatus.outpassDetails?.endTime}`);
        }
        // Mark attendance
        const parsedClassDate = new Date(classDate);
        parsedClassDate.setHours(0, 0, 0, 0);
        const attendance = await database_1.prisma.attendance.update({
            where: {
                studentId_courseId_classDate: {
                    studentId: request.studentId,
                    courseId,
                    classDate: parsedClassDate,
                },
            },
            data: {
                status: 'PRESENT',
                markedAt: new Date(),
                qrTokenId: qrValidation.payload.token,
            },
        });
        // Publish event
        await (0, publishers_1.publishAttendanceMarked)({
            attendanceId: attendance.id,
            studentId: attendance.studentId,
            courseId: attendance.courseId,
            status: attendance.status,
            markedAt: attendance.markedAt,
            teacherId,
        });
        return attendance;
    }
    async getAttendanceReport(courseId, date) {
        const classDate = new Date(date);
        classDate.setHours(0, 0, 0, 0);
        return await database_1.prisma.attendance.findMany({
            where: {
                courseId,
                classDate,
            },
            orderBy: {
                studentId: 'asc',
            },
        });
    }
    async getStudentAttendance(studentId, courseId) {
        return await database_1.prisma.attendance.findMany({
            where: {
                studentId,
                ...(courseId && { courseId }),
            },
            orderBy: {
                classDate: 'desc',
            },
        });
    }
}
exports.AttendanceService = AttendanceService;
exports.attendanceService = new AttendanceService();
//# sourceMappingURL=attendance.service.js.map