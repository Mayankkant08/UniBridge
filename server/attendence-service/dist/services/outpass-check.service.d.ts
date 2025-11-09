import { OutpassCheckResponseEvent } from '../types';
export declare class OutpassCheckService {
    private pendingRequests;
    checkStudentOutpassStatus(studentId: string): Promise<OutpassCheckResponseEvent>;
    handleOutpassResponse(response: OutpassCheckResponseEvent): void;
}
export declare const outpassCheckService: OutpassCheckService;
//# sourceMappingURL=outpass-check.service.d.ts.map