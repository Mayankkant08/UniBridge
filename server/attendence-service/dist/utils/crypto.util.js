"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoUtil = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
class CryptoUtil {
    static SECRET_KEY = env_1.env.QR_SECRET_KEY;
    static generateToken() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
    static signPayload(payload) {
        return crypto_1.default
            .createHmac('sha256', this.SECRET_KEY)
            .update(payload)
            .digest('hex');
    }
    static verifySignature(payload, signature) {
        const expectedSignature = this.signPayload(payload);
        return crypto_1.default.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
    }
}
exports.CryptoUtil = CryptoUtil;
//# sourceMappingURL=crypto.util.js.map