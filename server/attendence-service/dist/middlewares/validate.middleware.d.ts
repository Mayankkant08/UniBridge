import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const markAttendanceSchema: z.ZodObject<{
    qrToken: z.ZodString;
}, z.core.$strip>;
export declare const generateQRSchema: z.ZodObject<{
    courseId: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validate.middleware.d.ts.map