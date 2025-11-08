//server/attendence-service/src/events/publishers.ts
import { rabbitMQ } from '../config/rabbitmq';
import { AttendanceMarkedEvent } from '../types';

export async function publishAttendanceMarked(event: AttendanceMarkedEvent): Promise<void> {
  const channel = rabbitMQ.getChannel();

  channel.publish(
    'attendance.events',
    'attendance.marked',
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );

  console.log(`📤 Published attendance.marked event for student ${event.studentId}`);
}
