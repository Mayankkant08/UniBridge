import { CreateOutpassRequest, OutpassRecord, ApprovalRequest, OutpassStatus, OutpassType } from '../types';
export declare class OutpassService {
    createOutpass(studentId: string, request: CreateOutpassRequest): Promise<OutpassRecord>;
    parentApproval(request: ApprovalRequest, parentId: string): Promise<OutpassRecord>;
    wardenApproval(request: ApprovalRequest, wardenId: string): Promise<OutpassRecord>;
    cancelOutpass(outpassId: string, studentId: string, reason: string): Promise<OutpassRecord>;
    isStudentOnOutpass(studentId: string): Promise<{
        isOnOutpass: boolean;
        outpassDetails?: any;
    }>;
    getStudentOutpasses(studentId: string): Promise<OutpassRecord[]>;
    getPendingForParent(parentId: string): Promise<OutpassRecord[]>;
    getPendingForWarden(): Promise<OutpassRecord[]>;
    getAllOutpasses(filters?: {
        status?: OutpassStatus;
        type?: OutpassType;
        fromDate?: Date;
        toDate?: Date;
    }): Promise<OutpassRecord[]>;
    updateExpiredOutpasses(): Promise<void>;
}
export declare const outpassService: OutpassService;
//# sourceMappingURL=outpass.service.d.ts.map