import { PrismaClient } from '@prisma/client';
declare class DatabaseConnection {
    private prisma;
    constructor();
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getClient(): PrismaClient;
}
export declare const database: DatabaseConnection;
export declare const prisma: any;
export {};
//# sourceMappingURL=database.d.ts.map