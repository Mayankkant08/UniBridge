"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAttendanceMarked = publishAttendanceMarked;
//server/attendence-service/src/events/publishers.ts
const rabbitmq_1 = require("../config/rabbitmq");
async function publishAttendanceMarked(event) {
    const channel = rabbitmq_1.rabbitMQ.getChannel();
    channel.publish('attendance.events', 'attendance.marked', Buffer.from(JSON.stringify(event)), { persistent: true });
    console.log(`📤 Published attendance.marked event for student ${event.studentId}`);
}
//# sourceMappingURL=publishers.js.map