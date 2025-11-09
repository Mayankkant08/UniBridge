import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ResponseUtil } from '../utils/response.util';
import { OutpassType } from '../types';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ResponseUtil.error(res, 'Validation failed', 400, error.errors);
      }
      return ResponseUtil.error(res, 'Invalid request');
    }
  };
};

// Validation Schemas
export const createOutpassSchema = z.object({
  type: z.nativeEnum(OutpassType),
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
  proofDocument: z.string().optional(),
}).refine((data) => {
  const from = new Date(data.fromDate);
  const to = new Date(data.toDate);
  return to > from;
}, {
  message: 'To date must be after from date',
});

export const approvalSchema = z.object({
  approved: z.boolean(),
  rejectionReason: z.string().optional(),
}).refine((data) => {
  if (!data.approved && !data.rejectionReason) {
    return false;
  }
  return true;
}, {
  message: 'Rejection reason is required when rejecting',
});

export const cancelOutpassSchema = z.object({
  cancellationReason: z.string().min(5, 'Cancellation reason must be at least 5 characters'),
});
