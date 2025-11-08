import { prisma } from '../config/database';
import { publishOutpassStatusChanged } from '../events/publishers';
import {
  CreateOutpassRequest,
  OutpassRecord,
  ApprovalRequest,
  OutpassStatus,
  ApprovalStatus,
  OutpassType,
} from '../types';

export class OutpassService {
  // Create new outpass request
  async createOutpass(studentId: string, request: CreateOutpassRequest): Promise<OutpassRecord> {
    // Validate day outpass time constraints
    if (request.type === OutpassType.DAY_OUTPASS) {
      const fromDate = new Date(request.fromDate);
      const toDate = new Date(request.toDate);

      // Check if same day
      if (fromDate.toDateString() !== toDate.toDateString()) {
        throw new Error('Day outpass must be within the same day');
      }

      // Check time constraints (6 AM to 7 PM)
      const fromHour = fromDate.getHours();
      const toHour = toDate.getHours();

      if (fromHour < 6 || toHour > 19) {
        throw new Error('Day outpass must be between 6:00 AM and 7:00 PM');
      }
    }

    // Validate leave outpass has proof
    if (request.type === OutpassType.LEAVE_OUTPASS && !request.proofDocument) {
      throw new Error('Leave outpass requires proof document');
    }

    // Check for overlapping outpasses
    const overlapping = await prisma.outpass.findFirst({
      where: {
        studentId,
        status: {
          in: [OutpassStatus.PENDING, OutpassStatus.PARENT_APPROVED, OutpassStatus.APPROVED, OutpassStatus.ONGOING],
        },
        OR: [
          {
            AND: [
              { fromDate: { lte: request.fromDate } },
              { toDate: { gte: request.fromDate } },
            ],
          },
          {
            AND: [
              { fromDate: { lte: request.toDate } },
              { toDate: { gte: request.toDate } },
            ],
          },
        ],
      },
    });

    if (overlapping) {
      throw new Error('You already have an outpass for this time period');
    }

    const outpass = await prisma.outpass.create({
      data: {
        studentId,
        type: request.type,
        reason: request.reason,
        fromDate: request.fromDate,
        toDate: request.toDate,
        proofDocument: request.proofDocument,
        status: OutpassStatus.PENDING,
        parentApproval: ApprovalStatus.PENDING,
        wardenApproval: ApprovalStatus.PENDING,
      },
    });

    return outpass;
  }

  // Parent approval
  async parentApproval(request: ApprovalRequest, parentId: string): Promise<OutpassRecord> {
    const outpass = await prisma.outpass.findUnique({
      where: { id: request.outpassId },
    });

    if (!outpass) {
      throw new Error('Outpass not found');
    }

    if (outpass.status !== OutpassStatus.PENDING) {
      throw new Error('Outpass is not in pending state');
    }

    if (outpass.parentApproval !== ApprovalStatus.PENDING) {
      throw new Error('Parent has already responded to this outpass');
    }

    const previousStatus = outpass.status;

    if (request.approved) {
      // Parent approved - move to next level
      const updated = await prisma.outpass.update({
        where: { id: request.outpassId },
        data: {
          parentApproval: ApprovalStatus.APPROVED,
          parentApprovedAt: new Date(),
          parentApprovedBy: parentId,
          status: OutpassStatus.PARENT_APPROVED,
        },
      });

      await publishOutpassStatusChanged({
        outpassId: updated.id,
        studentId: updated.studentId,
        status: updated.status,
        previousStatus,
        changedBy: parentId,
        changedAt: new Date(),
      });

      return updated;
    } else {
      // Parent rejected - outpass failed
      const updated = await prisma.outpass.update({
        where: { id: request.outpassId },
        data: {
          parentApproval: ApprovalStatus.REJECTED,
          parentRejectionReason: request.rejectionReason,
          parentApprovedBy: parentId,
          status: OutpassStatus.REJECTED,
        },
      });

      await publishOutpassStatusChanged({
        outpassId: updated.id,
        studentId: updated.studentId,
        status: updated.status,
        previousStatus,
        changedBy: parentId,
        changedAt: new Date(),
      });

      return updated;
    }
  }

  // Warden approval
  async wardenApproval(request: ApprovalRequest, wardenId: string): Promise<OutpassRecord> {
    const outpass = await prisma.outpass.findUnique({
      where: { id: request.outpassId },
    });

    if (!outpass) {
      throw new Error('Outpass not found');
    }

    if (outpass.status !== OutpassStatus.PARENT_APPROVED) {
      throw new Error('Parent must approve first');
    }

    if (outpass.wardenApproval !== ApprovalStatus.PENDING) {
      throw new Error('Warden has already responded to this outpass');
    }

    const previousStatus = outpass.status;

    if (request.approved) {
      // Warden approved - outpass is now active
      const updated = await prisma.outpass.update({
        where: { id: request.outpassId },
        data: {
          wardenApproval: ApprovalStatus.APPROVED,
          wardenApprovedAt: new Date(),
          wardenApprovedBy: wardenId,
          status: OutpassStatus.APPROVED,
        },
      });

      await publishOutpassStatusChanged({
        outpassId: updated.id,
        studentId: updated.studentId,
        status: updated.status,
        previousStatus,
        changedBy: wardenId,
        changedAt: new Date(),
      });

      return updated;
    } else {
      // Warden rejected - outpass failed
      const updated = await prisma.outpass.update({
        where: { id: request.outpassId },
        data: {
          wardenApproval: ApprovalStatus.REJECTED,
          wardenRejectionReason: request.rejectionReason,
          wardenApprovedBy: wardenId,
          status: OutpassStatus.REJECTED,
        },
      });

      await publishOutpassStatusChanged({
        outpassId: updated.id,
        studentId: updated.studentId,
        status: updated.status,
        previousStatus,
        changedBy: wardenId,
        changedAt: new Date(),
      });

      return updated;
    }
  }

  // Cancel outpass (by student)
  async cancelOutpass(outpassId: string, studentId: string, reason: string): Promise<OutpassRecord> {
    const outpass = await prisma.outpass.findUnique({
      where: { id: outpassId },
    });

    if (!outpass) {
      throw new Error('Outpass not found');
    }

    if (outpass.studentId !== studentId) {
      throw new Error('Unauthorized to cancel this outpass');
    }

    if (![OutpassStatus.PENDING, OutpassStatus.PARENT_APPROVED, OutpassStatus.APPROVED].includes(outpass.status)) {
      throw new Error('Cannot cancel outpass in current state');
    }

    const previousStatus = outpass.status;

    const updated = await prisma.outpass.update({
      where: { id: outpassId },
      data: {
        status: OutpassStatus.CANCELED,
        canceledAt: new Date(),
        canceledBy: studentId,
        cancellationReason: reason,
      },
    });

    await publishOutpassStatusChanged({
      outpassId: updated.id,
      studentId: updated.studentId,
      status: updated.status,
      previousStatus,
      changedBy: studentId,
      changedAt: new Date(),
    });

    return updated;
  }

  // Check if student is currently on outpass
  async isStudentOnOutpass(studentId: string): Promise<{ isOnOutpass: boolean; outpassDetails?: any }> {
    const now = new Date();

    const activeOutpass = await prisma.outpass.findFirst({
      where: {
        studentId,
        status: {
          in: [OutpassStatus.APPROVED, OutpassStatus.ONGOING],
        },
        fromDate: { lte: now },
        toDate: { gte: now },
      },
    });

    if (activeOutpass) {
      // Update status to ONGOING if not already
      if (activeOutpass.status === OutpassStatus.APPROVED) {
        await prisma.outpass.update({
          where: { id: activeOutpass.id },
          data: { status: OutpassStatus.ONGOING },
        });
      }

      return {
        isOnOutpass: true,
        outpassDetails: {
          id: activeOutpass.id,
          startTime: activeOutpass.fromDate,
          endTime: activeOutpass.toDate,
          reason: activeOutpass.reason,
        },
      };
    }

    return { isOnOutpass: false };
  }

  // Get student outpasses
  async getStudentOutpasses(studentId: string): Promise<OutpassRecord[]> {
    return await prisma.outpass.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get pending outpasses for parent
  async getPendingForParent(parentId: string): Promise<OutpassRecord[]> {
    // In real implementation, you'd join with user table to get parent's children
    // For now, assuming parentId links to students
    return await prisma.outpass.findMany({
      where: {
        status: OutpassStatus.PENDING,
        parentApproval: ApprovalStatus.PENDING,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Get pending outpasses for warden
  async getPendingForWarden(): Promise<OutpassRecord[]> {
    return await prisma.outpass.findMany({
      where: {
        status: OutpassStatus.PARENT_APPROVED,
        wardenApproval: ApprovalStatus.PENDING,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  // Get all outpasses for warden (with filters)
  async getAllOutpasses(filters?: {
    status?: OutpassStatus;
    type?: OutpassType;
    fromDate?: Date;
    toDate?: Date;
  }): Promise<OutpassRecord[]> {
    return await prisma.outpass.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.type && { type: filters.type }),
        ...(filters?.fromDate && { fromDate: { gte: filters.fromDate } }),
        ...(filters?.toDate && { toDate: { lte: filters.toDate } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Update expired outpasses (cron job)
  async updateExpiredOutpasses(): Promise<void> {
    const now = new Date();

    await prisma.outpass.updateMany({
      where: {
        status: {
          in: [OutpassStatus.APPROVED, OutpassStatus.ONGOING],
        },
        toDate: { lt: now },
      },
      data: {
        status: OutpassStatus.EXPIRED,
      },
    });
  }
}

export const outpassService = new OutpassService();
