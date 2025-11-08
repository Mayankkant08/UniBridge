"use strict";
//server/attendence-service/src/services/outpass-check.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.outpassCheckService = exports.OutpassCheckService = void 0;
const uuid_1 = require("uuid");
const rabbitmq_1 = require("../config/rabbitmq");
class OutpassCheckService {
    pendingRequests = new Map();
    async checkStudentOutpassStatus(studentId) {
        const requestId = (0, uuid_1.v4)();
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                this.pendingRequests.delete(requestId);
                reject(new Error('Outpass check request timeout'));
            }, 5000);
            this.pendingRequests.set(requestId, (response) => {
                clearTimeout(timeout);
                resolve(response);
            });
            const event = {
                studentId,
                requestId,
                timestamp: new Date(),
            };
            const channel = rabbitmq_1.rabbitMQ.getChannel();
            channel.publish('outpass.events', 'outpass.check.request', Buffer.from(JSON.stringify(event)), { persistent: true });
        });
    }
    handleOutpassResponse(response) {
        const resolver = this.pendingRequests.get(response.requestId);
        if (resolver) {
            resolver(response);
            this.pendingRequests.delete(response.requestId);
        }
    }
}
exports.OutpassCheckService = OutpassCheckService;
exports.outpassCheckService = new OutpassCheckService();
//# sourceMappingURL=outpass-check.service.js.map