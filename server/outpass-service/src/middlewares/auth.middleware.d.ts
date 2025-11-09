import { Request, Response, NextFunction } from 'express';
import { UserPayload } from '../types';
export interface AuthRequest extends Request {
    user?: UserPayload;
}
export declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => any;
export declare const roleMiddleware: (...allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => any;
//# sourceMappingURL=auth.middleware.d.ts.map