"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrController = exports.QRController = void 0;
const qr_service_1 = require("../services/qr.service");
const response_util_1 = require("../utils/response.util");
class QRController {
    async generateQR(req, res) {
        try {
            const { courseId } = req.body;
            const teacherId = req.user.id;
            const qrData = await qr_service_1.qrService.generateQR(teacherId, courseId);
            return response_util_1.ResponseUtil.success(res, qrData, 'QR code generated successfully');
        }
        catch (error) {
            console.error('Generate QR error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
    async regenerateQR(req, res) {
        try {
            const { courseId } = req.body;
            const teacherId = req.user.id;
            const qrData = await qr_service_1.qrService.generateQR(teacherId, courseId);
            return response_util_1.ResponseUtil.success(res, qrData, 'QR code regenerated successfully');
        }
        catch (error) {
            console.error('Regenerate QR error:', error);
            return response_util_1.ResponseUtil.serverError(res, error.message);
        }
    }
}
exports.QRController = QRController;
exports.qrController = new QRController();
//# sourceMappingURL=qr.controller.js.map