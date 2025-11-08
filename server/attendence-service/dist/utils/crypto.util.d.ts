export declare class CryptoUtil {
    private static SECRET_KEY;
    static generateToken(): string;
    static signPayload(payload: string): string;
    static verifySignature(payload: string, signature: string): boolean;
}
//# sourceMappingURL=crypto.util.d.ts.map