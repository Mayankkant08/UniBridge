import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
export declare class QRController {
    generateQR(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    regenerateQR(req: AuthRequest, res: Response): Promise<Response<any, Record<string, any>>>;
}
export declare const qrController: QRController;
//# sourceMappingURL=qr.controller.d.ts.map