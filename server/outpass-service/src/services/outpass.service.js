"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outpassService = exports.OutpassService = void 0;
const database_1 = require("../config/database");
const publishers_1 = require("../events/publishers");
const types_1 = require("../types");
class OutpassService {
    // Create new outpass request
    async createOutpass(studentId, request) {
        // Validate day outpass time constraints
        if (request.type === types_1.OutpassType.DAY_OUTPASS) {
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
        if (request.type === types_1.OutpassType.LEAVE_OUTPASS && !request.proofDocument) {
            throw new Error('Leave outpass requires proof document');
        }
        // Check for overlapping outpasses
        const overlapping = await database_1.prisma.outpass.findFirst({
            where: {
                studentId,
                status: {
                    in: [types_1.OutpassStatus.PENDING, types_1.OutpassStatus.PARENT_APPROVED, types_1.OutpassStatus.APPROVED, types_1.OutpassStatus.ONGOING],
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
        const outpass = await database_1.prisma.outpass.create({
            data: {
                studentId,
                type: request.type,
                reason: request.reason,
                fromDate: request.fromDate,
                toDate: request.toDate,
                proofDocument: request.proofDocument,
                status: types_1.OutpassStatus.PENDING,
                parentApproval: types_1.ApprovalStatus.PENDING,
                wardenApproval: types_1.ApprovalStatus.PENDING,
            },
        });
        return outpass;
    }
    // Parent approval
    async parentApproval(request, parentId) {
        const outpass = await database_1.prisma.outpass.findUnique({
            where: { id: request.outpassId },
        });
        if (!outpass) {
            throw new Error('Outpass not found');
        }
        if (outpass.status !== types_1.OutpassStatus.PENDING) {
            throw new Error('Outpass is not in pending state');
        }
        if (outpass.parentApproval !== types_1.ApprovalStatus.PENDING) {
            throw new Error('Parent has already responded to this outpass');
        }
        const previousStatus = outpass.status;
        if (request.approved) {
            // Parent approved - move to next level
            const updated = await database_1.prisma.outpass.update({
                where: { id: request.outpassId },
                data: {
                    parentApproval: types_1.ApprovalStatus.APPROVED,
                    parentApprovedAt: new Date(),
                    parentApprovedBy: parentId,
                    status: types_1.OutpassStatus.PARENT_APPROVED,
                },
            });
            await (0, publishers_1.publishOutpassStatusChanged)({
                outpassId: updated.id,
                studentId: updated.studentId,
                status: updated.status,
                previousStatus,
                changedBy: parentId,
                changedAt: new Date(),
            });
            return updated;
        }
        else {
            // Parent rejected - outpass failed
            const updated = await database_1.prisma.outpass.update({
                where: { id: request.outpassId },
                data: {
                    parentApproval: types_1.ApprovalStatus.REJECTED,
                    parentRejectionReason: request.rejectionReason,
                    parentApprovedBy: parentId,
                    status: types_1.OutpassStatus.REJECTED,
                },
            });
            await (0, publishers_1.publishOutpassStatusChanged)({
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
    async wardenApproval(request, wardenId) {
        const outpass = await database_1.prisma.outpass.findUnique({
            where: { id: request.outpassId },
        });
        if (!outpass) {
            throw new Error('Outpass not found');
        }
        if (outpass.status !== types_1.OutpassStatus.PARENT_APPROVED) {
            throw new Error('Parent must approve first');
        }
        if (outpass.wardenApproval !== types_1.ApprovalStatus.PENDING) {
            throw new Error('Warden has already responded to this outpass');
        }
        const previousStatus = outpass.status;
        if (request.approved) {
            // Warden approved - outpass is now active
            const updated = await database_1.prisma.outpass.update({
                where: { id: request.outpassId },
                data: {
                    wardenApproval: types_1.ApprovalStatus.APPROVED,
                    wardenApprovedAt: new Date(),
                    wardenApprovedBy: wardenId,
                    status: types_1.OutpassStatus.APPROVED,
                },
            });
            await (0, publishers_1.publishOutpassStatusChanged)({
                outpassId: updated.id,
                studentId: updated.studentId,
                status: updated.status,
                previousStatus,
                changedBy: wardenId,
                changedAt: new Date(),
            });
            return updated;
        }
        else {
            // Warden rejected - outpass failed
            const updated = await database_1.prisma.outpass.update({
                where: { id: request.outpassId },
                data: {
                    wardenApproval: types_1.ApprovalStatus.REJECTED,
                    wardenRejectionReason: request.rejectionReason,
                    wardenApprovedBy: wardenId,
                    status: types_1.OutpassStatus.REJECTED,
                },
            });
            await (0, publishers_1.publishOutpassStatusChanged)({
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
    async cancelOutpass(outpassId, studentId, reason) {
        const outpass = await database_1.prisma.outpass.findUnique({
            where: { id: outpassId },
        });
        if (!outpass) {
            throw new Error('Outpass not found');
        }
        if (outpass.studentId !== studentId) {
            throw new Error('Unauthorized to cancel this outpass');
        }
        if (![types_1.OutpassStatus.PENDING, types_1.OutpassStatus.PARENT_APPROVED, types_1.OutpassStatus.APPROVED].includes(outpass.status)) {
            throw new Error('Cannot cancel outpass in current state');
        }
        const previousStatus = outpass.status;
        const updated = await database_1.prisma.outpass.update({
            where: { id: outpassId },
            data: {
                status: types_1.OutpassStatus.CANCELED,
                canceledAt: new Date(),
                canceledBy: studentId,
                cancellationReason: reason,
            },
        });
        await (0, publishers_1.publishOutpassStatusChanged)({
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
    async isStudentOnOutpass(studentId) {
        const now = new Date();
        const activeOutpass = await database_1.prisma.outpass.findFirst({
            where: {
                studentId,
                status: {
                    in: [types_1.OutpassStatus.APPROVED, types_1.OutpassStatus.ONGOING],
                },
                fromDate: { lte: now },
                toDate: { gte: now },
            },
        });
        if (activeOutpass) {
            // Update status to ONGOING if not already
            if (activeOutpass.status === types_1.OutpassStatus.APPROVED) {
                await database_1.prisma.outpass.update({
                    where: { id: activeOutpass.id },
                    data: { status: types_1.OutpassStatus.ONGOING },
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
    async getStudentOutpasses(studentId) {
        return await database_1.prisma.outpass.findMany({
            where: { studentId },
            orderBy: { createdAt: 'desc' },
        });
    }
    // Get pending outpasses for parent
    async getPendingForParent(parentId) {
        // In real implementation, you'd join with user table to get parent's children
        // For now, assuming parentId links to students
        return await database_1.prisma.outpass.findMany({
            where: {
                status: types_1.OutpassStatus.PENDING,
                parentApproval: types_1.ApprovalStatus.PENDING,
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    // Get pending outpasses for warden
    async getPendingForWarden() {
        return await database_1.prisma.outpass.findMany({
            where: {
                status: types_1.OutpassStatus.PARENT_APPROVED,
                wardenApproval: types_1.ApprovalStatus.PENDING,
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    // Get all outpasses for warden (with filters)
    async getAllOutpasses(filters) {
        return await database_1.prisma.outpass.findMany({
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
    async updateExpiredOutpasses() {
        const now = new Date();
        await database_1.prisma.outpass.updateMany({
            where: {
                status: {
                    in: [types_1.OutpassStatus.APPROVED, types_1.OutpassStatus.ONGOING],
                },
                toDate: { lt: now },
            },
            data: {
                status: types_1.OutpassStatus.EXPIRED,
            },
        });
    }
}
exports.OutpassService = OutpassService;
exports.outpassService = new OutpassService();
//# sourceMappingURL=outpass.service.js.map