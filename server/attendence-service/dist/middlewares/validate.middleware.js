"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRSchema = exports.markAttendanceSchema = exports.validateRequest = void 0;
const zod_1 = require("zod");
const response_util_1 = require("../utils/response.util");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return response_util_1.ResponseUtil.error(res, 'Validation failed', 400, error.issues);
            }
            return response_util_1.ResponseUtil.error(res, 'Invalid request');
        }
    };
};
exports.validateRequest = validateRequest;
// Validation Schemas
exports.markAttendanceSchema = zod_1.z.object({
    qrToken: zod_1.z.string().min(1, 'QR token is required'),
});
exports.generateQRSchema = zod_1.z.object({
    courseId: zod_1.z.string().min(1, 'Course ID is required'),
});
//# sourceMappingURL=validate.middleware.js.map