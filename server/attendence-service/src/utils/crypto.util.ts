import crypto from 'crypto';
import { env } from '../config/env';

export class CryptoUtil {
  private static SECRET_KEY = env.QR_SECRET_KEY;

  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static signPayload(payload: string): string {
    return crypto
      .createHmac('sha256', this.SECRET_KEY)
      .update(payload)
      .digest('hex');
  }

  static verifySignature(payload: string, signature: string): boolean {
    const expectedSignature = this.signPayload(payload);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}
