"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outpassController = exports.OutpassController = void 0;
const express_1 = require("express");
const outpass_service_1 = require("../services/outpass.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const response_util_1 = require("../utils/response.util");
const types_1 = require("../types");
class OutpassController {
    // Student creates outpass request
    async createOutpass(req, res) {
        try {
            const studentId = req.user.id;
            const outpass = await outpass_service_1.outpassService.createOutpass(studentId, req.body);
            return response_util_1.ResponseUtil.created(res, outpass, 'Outpass request created successfully');
        }
        catch (error) {
            console.error('Create outpass error:', error);
            return response_util_1.ResponseUtil.error(res, error.message);
        }
    }
    // Parent approves/rejects outpass
    async parentApproval(req, res) {
        try {
            const parentId = req.user.id;
            const { outpassId } = req.params;
            const outpass = await outpass_service_1.outpassService.parentApproval({
                outpassId,
                approverRole: 'PARENT',
                approved: req.body.approved,
                rejectionReason: req.body.rejectionReason,
            }, parentId);
            return response_util_1.ResponseUtil.success(res, outpass, 'Outpass response recorded');
        }
        catch (error) {
            console.error('Parent approval error:', error);
            return response_util_1.ResponseUtil.error(res, error.message);
        }
    }
    // Warden approves/rejects outpass
    async wardenApproval(req, res) {
        try {
            const wardenId = req.user.id;
            const { outpassId } = req.params;
            const outpass = await outpass_service_1.outpassService.wardenApproval({
                outpassId,
                approverRole: 'WARDEN',
                approved: req.body.approved,
                rejectionReason: req.body.rejectionReason,
            }, wardenId);
            return response_util_1.ResponseUtil.success(res, outpass, 'Outpass response recorded');
        }
        catch (error) {
            console.error('Warden approval error:', error);
            return response_util_1.ResponseUtil.error(res, error.message);
        }
    }
    // Student cancels outpass
    async cancelOutpass(req, res) {
        try {
            const studentId = req.user.id;
            const { outpassId } = req.params;
            const outpass = await outpass_service_1.outpassService.cancelOutpass(outpassId, studentId, req.body.cancellationReason);
            return response_util_1.ResponseUtil.success(res, outpass, 'Outpass canceled successfully');
        }
        catch (error) {
            console.error('Cancel outpass error:', error);
            return response_util_1.ResponseUtil.error(res, error.message);
        }
    }
    // Get student's outpasses
    async getStudentOutpasses(req, res) {
        try {
            const studentId = req.user.role === 'STUDENT' ? req.user.id : req.params.studentId;
            const outpasses = await outpass_service_1.outpassService.getStudentOutpasses(studentId);
            return response_util_1.ResponseUtil.success(res, outpasses, 'Student outpasses fetched successfully');
        }
        catch (error) {
            console.error('Get student outpasses error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
    // Get pending outpasses for parent
    async getPendingForParent(req, res) {
        try {
            const parentId = req.user.id;
            const outpasses = await outpass_service_1.outpassService.getPendingForParent(parentId);
            return response_util_1.ResponseUtil.success(res, outpasses, 'Pending outpasses fetched successfully');
        }
        catch (error) {
            console.error('Get pending for parent error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
    // Get pending outpasses for warden
    async getPendingForWarden(req, res) {
        try {
            const outpasses = await outpass_service_1.outpassService.getPendingForWarden();
            return response_util_1.ResponseUtil.success(res, outpasses, 'Pending outpasses fetched successfully');
        }
        catch (error) {
            console.error('Get pending for warden error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
    // Get all outpasses with filters (for warden/admin)
    async getAllOutpasses(req, res) {
        try {
            const { status, type, fromDate, toDate } = req.query;
            const filters = {};
            if (status)
                filters.status = status;
            if (type)
                filters.type = type;
            if (fromDate)
                filters.fromDate = new Date(fromDate);
            if (toDate)
                filters.toDate = new Date(toDate);
            const outpasses = await outpass_service_1.outpassService.getAllOutpasses(filters);
            return response_util_1.ResponseUtil.success(res, outpasses, 'All outpasses fetched successfully');
        }
        catch (error) {
            console.error('Get all outpasses error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
}
exports.OutpassController = OutpassController;
exports.outpassController = new OutpassController();
//# sourceMappingURL=outpass.controller.js.map