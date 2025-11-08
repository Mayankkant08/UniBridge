export interface OutpassCheckRequestEvent {
    studentId: string;
    requestId: string;
    timestamp: Date;
}
export interface OutpassCheckResponseEvent {
    studentId: string;
    requestId: string;
    isOnOutpass: boolean;
    outpassDetails?: {
        id: string;
        startTime: Date;
        endTime: Date;
        reason: string;
    };
}
export interface AttendanceMarkedEvent {
    attendanceId: string;
    studentId: string;
    courseId: string;
    status: string;
    markedAt: Date;
    teacherId: string;
}
export interface QRPayload {
    teacherId: string;
    courseId: string;
    token: string;
    expiresAt: number;
    classDate: string;
}
export interface QRGenerationResponse {
    qrCodeData: string;
    token: string;
    expiresAt: Date;
    expiresIn: number;
}
export interface MarkAttendanceRequest {
    studentId: string;
    qrToken: string;
    scannedAt: Date;
}
export interface AttendanceRecord {
    id: string;
    studentId: string;
    courseId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE';
    markedAt: Date | null;
    teacherId: string;
    classDate: Date;
}
export interface UserPayload {
    id: string;
    email: string;
    role: 'TEACHER' | 'STUDENT' | 'WARDEN' | 'PARENT';
}
//# sourceMappingURL=index.d.ts.map