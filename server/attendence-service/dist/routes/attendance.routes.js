"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
router.post('/mark', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('STUDENT'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.markAttendanceSchema), attendance_controller_1.attendanceController.markAttendance.bind(attendance_controller_1.attendanceController));
router.get('/report', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('TEACHER', 'WARDEN'), attendance_controller_1.attendanceController.getAttendanceReport.bind(attendance_controller_1.attendanceController));
router.get('/student/:studentId?', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('STUDENT', 'PARENT', 'WARDEN', 'TEACHER'), attendance_controller_1.attendanceController.getStudentAttendance.bind(attendance_controller_1.attendanceController));
exports.default = router; // ← Changed from export const attendanceRoutes
//# sourceMappingURL=attendance.routes.js.map