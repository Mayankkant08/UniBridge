// Outpass Types
export enum OutpassType {
  DAY_OUTPASS = 'DAY_OUTPASS',
  LEAVE_OUTPASS = 'LEAVE_OUTPASS',
}

export enum OutpassStatus {
  PENDING = 'PENDING',
  PARENT_APPROVED = 'PARENT_APPROVED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELED = 'CANCELED',
  ONGOING = 'ONGOING',
  EXPIRED = 'EXPIRED',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface CreateOutpassRequest {
  type: OutpassType;
  reason: string;
  fromDate: Date;
  toDate: Date;
  proofDocument?: string;
}

export interface OutpassRecord {
  id: string;
  studentId: string;
  type: OutpassType;
  reason: string;
  fromDate: Date;
  toDate: Date;
  proofDocument?: string;
  status: OutpassStatus;
  parentApproval: ApprovalStatus;
  wardenApproval: ApprovalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApprovalRequest {
  outpassId: string;
  approverRole: 'PARENT' | 'WARDEN';
  approved: boolean;
  rejectionReason?: string;
}

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

export interface OutpassStatusChangedEvent {
  outpassId: string;
  studentId: string;
  status: OutpassStatus;
  previousStatus: OutpassStatus;
  changedBy: string;
  changedAt: Date;
}

// Auth Types
export interface UserPayload {
  id: string;
  email: string;
  role: 'TEACHER' | 'STUDENT' | 'WARDEN' | 'PARENT';
}
