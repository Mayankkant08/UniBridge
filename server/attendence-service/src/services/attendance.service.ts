//server/attendence-service/src/services/attendance.service.ts

import { prisma } from '../config/database';
import { qrService } from './qr.service';
import { outpassCheckService } from './outpass-check.service';
import { publishAttendanceMarked } from '../events/publishers';
import { MarkAttendanceRequest, AttendanceRecord } from '../types';

export class AttendanceService {
  async initializeAttendance(
    courseId: string,
    studentIds: string[],
    teacherId: string,
    classDate?: Date
  ): Promise<void> {
    const date = classDate || new Date();
    date.setHours(0, 0, 0, 0);

    const attendanceRecords = studentIds.map((studentId) => ({
      studentId,
      courseId,
      teacherId,
      classDate: date,
      status: 'ABSENT' as const,
    }));

    await prisma.attendance.createMany({
      data: attendanceRecords,
      skipDuplicates: true,
    });
  }

  async markAttendance(request: MarkAttendanceRequest): Promise<AttendanceRecord> {
    // Validate QR code
    const qrValidation = await qrService.validateQR(request.qrToken);
    if (!qrValidation.valid) {
      throw new Error(qrValidation.error || 'Invalid QR code');
    }

    const { courseId, teacherId, classDate } = qrValidation.payload!;

    // Check if student is on outpass
    const outpassStatus = await outpassCheckService.checkStudentOutpassStatus(request.studentId);

    if (outpassStatus.isOnOutpass) {
      throw new Error(
        `Cannot mark attendance. You are currently on outpass until ${outpassStatus.outpassDetails?.endTime}`
      );
    }

    // Mark attendance
    const parsedClassDate = new Date(classDate);
    parsedClassDate.setHours(0, 0, 0, 0);

    const attendance = await prisma.attendance.update({
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
        qrTokenId: qrValidation.payload!.token,
      },
    });

    // Publish event
    await publishAttendanceMarked({
      attendanceId: attendance.id,
      studentId: attendance.studentId,
      courseId: attendance.courseId,
      status: attendance.status,
      markedAt: attendance.markedAt!,
      teacherId,
    });

    return attendance;
  }

  async getAttendanceReport(courseId: string, date: Date): Promise<AttendanceRecord[]> {
    const classDate = new Date(date);
    classDate.setHours(0, 0, 0, 0);

    return await prisma.attendance.findMany({
      where: {
        courseId,
        classDate,
      },
      orderBy: {
        studentId: 'asc',
      },
    });
  }

  async getStudentAttendance(studentId: string, courseId?: string): Promise<AttendanceRecord[]> {
    return await prisma.attendance.findMany({
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

export const attendanceService = new AttendanceService();
