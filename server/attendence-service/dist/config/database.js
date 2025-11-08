"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.database = void 0;
//server/attendence-service/src/config/database.ts
const client_1 = require("@prisma/client");
class DatabaseConnection {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient({
            log: ['query', 'error', 'warn'],
        });
    }
    async connect() {
        try {
            await this.prisma.$connect();
            console.log('✅ Database connected successfully');
        }
        catch (error) {
            console.error('❌ Database connection failed:', error);
            throw error;
        }
    }
    async disconnect() {
        await this.prisma.$disconnect();
    }
    getClient() {
        return this.prisma;
    }
}
exports.database = new DatabaseConnection();
exports.prisma = exports.database.getClient();
//# sourceMappingURL=database.js.map