import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
export declare class OutpassController {
    createOutpass(req: AuthRequest, res: Response): Promise<any>;
    parentApproval(req: AuthRequest, res: Response): Promise<any>;
    wardenApproval(req: AuthRequest, res: Response): Promise<any>;
    cancelOutpass(req: AuthRequest, res: Response): Promise<any>;
    getStudentOutpasses(req: AuthRequest, res: Response): Promise<any>;
    getPendingForParent(req: AuthRequest, res: Response): Promise<any>;
    getPendingForWarden(req: AuthRequest, res: Response): Promise<any>;
    getAllOutpasses(req: AuthRequest, res: Response): Promise<any>;
}
export declare const outpassController: OutpassController;
//# sourceMappingURL=outpass.controller.d.ts.map