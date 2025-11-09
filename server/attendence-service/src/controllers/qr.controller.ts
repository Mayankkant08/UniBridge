//server/attendence-service/src/controllers/attendance.controller.ts
import { Response } from 'express';
import { qrService } from '../services/qr.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ResponseUtil } from '../utils/response.util';

export class QRController {
  async generateQR(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.body;
      const teacherId = req.user!.id;

      const qrData = await qrService.generateQR(teacherId, courseId);

      return ResponseUtil.success(res, qrData, 'QR code generated successfully');
    } catch (error: any) {
      console.error('Generate QR error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }

  async regenerateQR(req: AuthRequest, res: Response) {
    try {
      const { courseId } = req.body;
      const teacherId = req.user!.id;

      const qrData = await qrService.generateQR(teacherId, courseId);

      return ResponseUtil.success(res, qrData, 'QR code regenerated successfully');
    } catch (error: any) {
      console.error('Regenerate QR error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }
}

export const qrController = new QRController();
