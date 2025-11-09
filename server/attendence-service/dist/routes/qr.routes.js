"use strict";
// src/routes/qr.routes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qr_controller_1 = require("../controllers/qr.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const router = (0, express_1.Router)();
router.post('/generate', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('TEACHER'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.generateQRSchema), qr_controller_1.qrController.generateQR.bind(qr_controller_1.qrController));
router.post('/regenerate', auth_middleware_1.authMiddleware, (0, auth_middleware_1.roleMiddleware)('TEACHER'), (0, validate_middleware_1.validateRequest)(validate_middleware_1.generateQRSchema), qr_controller_1.qrController.regenerateQR.bind(qr_controller_1.qrController));
exports.default = router;
//# sourceMappingURL=qr.routes.js.map