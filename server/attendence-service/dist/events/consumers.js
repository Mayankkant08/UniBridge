"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsumers = startConsumers;
//server/attendence-service/src/events/consumers.ts
const rabbitmq_1 = require("../config/rabbitmq");
const outpass_check_service_1 = require("../services/outpass-check.service");
async function startConsumers() {
    const channel = rabbitmq_1.rabbitMQ.getChannel();
    channel.consume('attendance.outpass-check-responses', async (msg) => {
        if (msg) {
            try {
                const response = JSON.parse(msg.content.toString());
                console.log(`📥 Received outpass check response for student ${response.studentId}`);
                outpass_check_service_1.outpassCheckService.handleOutpassResponse(response);
                channel.ack(msg);
            }
            catch (error) {
                console.error('Error processing outpass response:', error);
                channel.nack(msg, false, false);
            }
        }
    });
    console.log('👂 Started listening for outpass check responses');
}
//# sourceMappingURL=consumers.js.map