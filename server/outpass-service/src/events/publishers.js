"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishOutpassCheckResponse = publishOutpassCheckResponse;
exports.publishOutpassStatusChanged = publishOutpassStatusChanged;
const rabbitmq_1 = require("../config/rabbitmq");
const types_1 = require("../types");
async function publishOutpassCheckResponse(event) {
    const channel = rabbitmq_1.rabbitMQ.getChannel();
    channel.publish('outpass.events', 'outpass.check.response', Buffer.from(JSON.stringify(event)), { persistent: true });
    console.log(`📤 Published outpass check response for student ${event.studentId}`);
}
async function publishOutpassStatusChanged(event) {
    const channel = rabbitmq_1.rabbitMQ.getChannel();
    channel.publish('outpass.events', 'outpass.status.changed', Buffer.from(JSON.stringify(event)), { persistent: true });
    console.log(`📤 Published outpass status changed for outpass ${event.outpassId}`);
}
//# sourceMappingURL=publishers.js.map