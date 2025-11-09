//server/attendence-service/src/services/qr.service.ts

import QRCode from 'qrcode';
import { prisma } from '../config/database';
import { redis } from '../config/redis';
import { CryptoUtil } from '../utils/crypto.util';
import { env } from '../config/env';
import { QRPayload, QRGenerationResponse } from '../types';

export class QRService {
  private readonly QR_EXPIRY = parseInt(env.QR_EXPIRY_SECONDS) || 30;
  private readonly REDIS_PREFIX = 'qr:token:';

  async generateQR(teacherId: string, courseId: string): Promise<QRGenerationResponse> {
    const token = CryptoUtil.generateToken();
    const expiresAt = new Date(Date.now() + this.QR_EXPIRY * 1000);
    const classDate = new Date().toISOString().split('T')[0] || '';

    const payload: QRPayload = {
      teacherId,
      courseId,
      token,
      expiresAt: expiresAt.getTime(),
      classDate,
    };

    const payloadString = JSON.stringify(payload);
    const signature = CryptoUtil.signPayload(payloadString);

    // Store in Redis with expiry
    const redisKey = `${this.REDIS_PREFIX}${token}`;
    await redis.setEx(redisKey, this.QR_EXPIRY, JSON.stringify({ ...payload, signature }));

    // Store in database for auditing
    await prisma.qRToken.create({
      data: {
        teacherId,
        courseId,
        token,
        signature,
        expiresAt,
        isActive: true,
      },
    });

    // Generate QR code image
    const qrData = JSON.stringify({ ...payload, signature });
    const qrCodeData = await QRCode.toDataURL(qrData);

    return {
      qrCodeData,
      token,
      expiresAt,
      expiresIn: this.QR_EXPIRY,
    };
  }

  async validateQR(qrData: string): Promise<{ valid: boolean; payload?: QRPayload; error?: string }> {
    try {
      const parsed = JSON.parse(qrData);
      const { signature, ...payload } = parsed;

      // Verify signature
      const payloadString = JSON.stringify(payload);
      const isSignatureValid = CryptoUtil.verifySignature(payloadString, signature);

      if (!isSignatureValid) {
        return { valid: false, error: 'Invalid QR code signature' };
      }

      // Check in Redis first
      const redisKey = `${this.REDIS_PREFIX}${payload.token}`;
      const cachedData = await redis.get(redisKey);

      if (!cachedData) {
        return { valid: false, error: 'QR code has expired or is invalid' };
      }

      // Check expiration
      if (Date.now() > payload.expiresAt) {
        await redis.del(redisKey);
        return { valid: false, error: 'QR code has expired' };
      }

      return { valid: true, payload };
    } catch (error) {
      return { valid: false, error: 'Invalid QR code format' };
    }
  }

  async invalidateQR(token: string): Promise<void> {
    const redisKey = `${this.REDIS_PREFIX}${token}`;
    await redis.del(redisKey);

    await prisma.qRToken.updateMany({
      where: { token },
      data: { isActive: false },
    });
  }
}

export const qrService = new QRService();
