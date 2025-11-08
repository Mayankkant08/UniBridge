"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOutpassSchema = exports.approvalSchema = exports.createOutpassSchema = exports.validateRequest = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const response_util_1 = require("../utils/response.util");
const types_1 = require("../types");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return response_util_1.ResponseUtil.error(res, 'Validation failed', 400, error.errors);
            }
            return response_util_1.ResponseUtil.error(res, 'Invalid request');
        }
    };
};
exports.validateRequest = validateRequest;
// Validation Schemas
exports.createOutpassSchema = zod_1.z.object({
    type: zod_1.z.nativeEnum(types_1.OutpassType),
    reason: zod_1.z.string().min(10, 'Reason must be at least 10 characters'),
    fromDate: zod_1.z.string().datetime(),
    toDate: zod_1.z.string().datetime(),
    proofDocument: zod_1.z.string().optional(),
}).refine((data) => {
    const from = new Date(data.fromDate);
    const to = new Date(data.toDate);
    return to > from;
}, {
    message: 'To date must be after from date',
});
exports.approvalSchema = zod_1.z.object({
    approved: zod_1.z.boolean(),
    rejectionReason: zod_1.z.string().optional(),
}).refine((data) => {
    if (!data.approved && !data.rejectionReason) {
        return false;
    }
    return true;
}, {
    message: 'Rejection reason is required when rejecting',
});
exports.cancelOutpassSchema = zod_1.z.object({
    cancellationReason: zod_1.z.string().min(5, 'Cancellation reason must be at least 5 characters'),
});
//# sourceMappingURL=validate.middleware.js.map