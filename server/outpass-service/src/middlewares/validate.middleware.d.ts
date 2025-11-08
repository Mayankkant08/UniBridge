import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { OutpassType } from '../types';
export declare const validateRequest: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => any;
export declare const createOutpassSchema: z.ZodObject<{
    type: z.ZodEnum<typeof OutpassType>;
    reason: z.ZodString;
    fromDate: z.ZodString;
    toDate: z.ZodString;
    proofDocument: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const approvalSchema: z.ZodObject<{
    approved: z.ZodBoolean;
    rejectionReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const cancelOutpassSchema: z.ZodObject<{
    cancellationReason: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=validate.middleware.d.ts.map