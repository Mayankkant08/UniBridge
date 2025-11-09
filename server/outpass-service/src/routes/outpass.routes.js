"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outpass_controller_1 = require("../controllers/outpass.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
// Student routes
router.post('/create', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('STUDENT'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.createOutpassSchema), outpass_controller_1.outpassController.createOutpass.bind(outpass_controller_1.outpassController));
router.post('/:outpassId/cancel', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('STUDENT'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.cancelOutpassSchema), outpass_controller_1.outpassController.cancelOutpass.bind(outpass_controller_1.outpassController));
router.get('/my-outpasses', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('STUDENT'), outpass_controller_1.outpassController.getStudentOutpasses.bind(outpass_controller_1.outpassController));
// Parent routes
router.get('/pending/parent', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('PARENT'), outpass_controller_1.outpassController.getPendingForParent.bind(outpass_controller_1.outpassController));
router.post('/:outpassId/approve/parent', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('PARENT'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.approvalSchema), outpass_controller_1.outpassController.parentApproval.bind(outpass_controller_1.outpassController));
// Warden routes
router.get('/pending/warden', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('WARDEN'), outpass_controller_1.outpassController.getPendingForWarden.bind(outpass_controller_1.outpassController));
router.post('/:outpassId/approve/warden', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('WARDEN'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.approvalSchema), outpass_controller_1.outpassController.wardenApproval.bind(outpass_controller_1.outpassController));
router.get('/all', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('WARDEN', 'TEACHER'), outpass_controller_1.outpassController.getAllOutpasses.bind(outpass_controller_1.outpassController));
// Common routes
router.get('/student/:studentId', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('PARENT', 'WARDEN', 'TEACHER'), outpass_controller_1.outpassController.getStudentOutpasses.bind(outpass_controller_1.outpassController));
exports.default = router;
//# sourceMappingURL=outpass.routes.js.map