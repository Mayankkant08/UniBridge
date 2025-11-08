import { Response } from 'express';
import { outpassService } from '../services/outpass.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ResponseUtil } from '../utils/response.util';
import { OutpassStatus, OutpassType } from '../types';

export class OutpassController {
  // Student creates outpass request
  async createOutpass(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.id;
      const outpass = await outpassService.createOutpass(studentId, req.body);

      return ResponseUtil.created(res, outpass, 'Outpass request created successfully');
    } catch (error: any) {
      console.error('Create outpass error:', error);
      return ResponseUtil.error(res, error.message);
    }
  }

  // Parent approves/rejects outpass
  async parentApproval(req: AuthRequest, res: Response) {
    try {
      const parentId = req.user!.id;
      const { outpassId } = req.params;

      const outpass = await outpassService.parentApproval(
        {
          outpassId,
          approverRole: 'PARENT',
          approved: req.body.approved,
          rejectionReason: req.body.rejectionReason,
        },
        parentId
      );

      return ResponseUtil.success(res, outpass, 'Outpass response recorded');
    } catch (error: any) {
      console.error('Parent approval error:', error);
      return ResponseUtil.error(res, error.message);
    }
  }

  // Warden approves/rejects outpass
  async wardenApproval(req: AuthRequest, res: Response) {
    try {
      const wardenId = req.user!.id;
      const { outpassId } = req.params;

      const outpass = await outpassService.wardenApproval(
        {
          outpassId,
          approverRole: 'WARDEN',
          approved: req.body.approved,
          rejectionReason: req.body.rejectionReason,
        },
        wardenId
      );

      return ResponseUtil.success(res, outpass, 'Outpass response recorded');
    } catch (error: any) {
      console.error('Warden approval error:', error);
      return ResponseUtil.error(res, error.message);
    }
  }

  // Student cancels outpass
  async cancelOutpass(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.id;
      const { outpassId } = req.params;

      const outpass = await outpassService.cancelOutpass(
        outpassId,
        studentId,
        req.body.cancellationReason
      );

      return ResponseUtil.success(res, outpass, 'Outpass canceled successfully');
    } catch (error: any) {
      console.error('Cancel outpass error:', error);
      return ResponseUtil.error(res, error.message);
    }
  }

  // Get student's outpasses
  async getStudentOutpasses(req: AuthRequest, res: Response) {
    try {
      const studentId = req.user!.role === 'STUDENT' ? req.user!.id : req.params.studentId;
      const outpasses = await outpassService.getStudentOutpasses(studentId);

      return ResponseUtil.success(res, outpasses, 'Student outpasses fetched successfully');
    } catch (error: any) {
      console.error('Get student outpasses error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }

  // Get pending outpasses for parent
  async getPendingForParent(req: AuthRequest, res: Response) {
    try {
      const parentId = req.user!.id;
      const outpasses = await outpassService.getPendingForParent(parentId);

      return ResponseUtil.success(res, outpasses, 'Pending outpasses fetched successfully');
    } catch (error: any) {
      console.error('Get pending for parent error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }

  // Get pending outpasses for warden
  async getPendingForWarden(req: AuthRequest, res: Response) {
    try {
      const outpasses = await outpassService.getPendingForWarden();

      return ResponseUtil.success(res, outpasses, 'Pending outpasses fetched successfully');
    } catch (error: any) {
      console.error('Get pending for warden error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }

  // Get all outpasses with filters (for warden/admin)
  async getAllOutpasses(req: AuthRequest, res: Response) {
    try {
      const { status, type, fromDate, toDate } = req.query;

      const filters: any = {};
      if (status) filters.status = status as OutpassStatus;
      if (type) filters.type = type as OutpassType;
      if (fromDate) filters.fromDate = new Date(fromDate as string);
      if (toDate) filters.toDate = new Date(toDate as string);

      const outpasses = await outpassService.getAllOutpasses(filters);

      return ResponseUtil.success(res, outpasses, 'All outpasses fetched successfully');
    } catch (error: any) {
      console.error('Get all outpasses error:', error);
      return ResponseUtil.serverError(res, error.message);
    }
  }
}

export const outpassController = new OutpassController();
