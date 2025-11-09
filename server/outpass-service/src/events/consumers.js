"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumers = startConsumers;
const rabbitmq_1 = require("../config/rabbitmq");
const outpass_service_1 = require("../services/outpass.service");
const publishers_1 = require("./publishers");
const types_1 = require("../types");
async function startConsumers() {
    const channel = rabbitmq_1.rabbitMQ.getChannel();
    // Listen for outpass check requests from attendance service
    channel.consume('outpass.check-requests', async (msg) => {
        if (msg) {
            try {
                const request = JSON.parse(msg.content.toString());
                console.log(`📥 Received outpass check request for student ${request.studentId}`);
                // Check if student is on outpass
                const result = await outpass_service_1.outpassService.isStudentOnOutpass(request.studentId);
                // Send response back
                await (0, publishers_1.publishOutpassCheckResponse)({
                    studentId: request.studentId,
                    requestId: request.requestId,
                    isOnOutpass: result.isOnOutpass,
                    outpassDetails: result.outpassDetails,
                });
                channel.ack(msg);
            }
            catch (error) {
                console.error('Error processing outpass check request:', error);
                channel.nack(msg, false, false);
            }
        }
    });
    console.log('👂 Started listening for outpass check requests');
}
//# sourceMappingURL=consumers.js.map