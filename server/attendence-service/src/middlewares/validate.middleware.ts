//server/attendence-service/src/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ResponseUtil } from '../utils/response.util';

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return ResponseUtil.error(res, 'Validation failed', 400, error.issues);
      }
      return ResponseUtil.error(res, 'Invalid request');
    }
  };
};

// Validation Schemas
export const markAttendanceSchema = z.object({
  qrToken: z.string().min(1, 'QR token is required'),
});

export const generateQRSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});
