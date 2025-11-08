import { QRPayload, QRGenerationResponse } from '../types';
export declare class QRService {
    private readonly QR_EXPIRY;
    private readonly REDIS_PREFIX;
    generateQR(teacherId: string, courseId: string): Promise<QRGenerationResponse>;
    validateQR(qrData: string): Promise<{
        valid: boolean;
        payload?: QRPayload;
        error?: string;
    }>;
    invalidateQR(token: string): Promise<void>;
}
export declare const qrService: QRService;
//# sourceMappingURL=qr.service.d.ts.map