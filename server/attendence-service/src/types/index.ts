//server/attendence-service/src/types/index.ts

// Event Types
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

// QR Types
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

// Attendance Types
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

// Auth Types
export interface UserPayload {
  id: string;
  email: string;
  role: 'TEACHER' | 'STUDENT' | 'WARDEN' | 'PARENT';
}
