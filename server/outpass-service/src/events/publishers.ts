import { rabbitMQ } from '../config/rabbitmq';
import { OutpassCheckResponseEvent, OutpassStatusChangedEvent } from '../types';

export async function publishOutpassCheckResponse(event: OutpassCheckResponseEvent): Promise<void> {
  const channel = rabbitMQ.getChannel();

  channel.publish(
    'outpass.events',
    'outpass.check.response',
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );

  console.log(`📤 Published outpass check response for student ${event.studentId}`);
}

export async function publishOutpassStatusChanged(event: OutpassStatusChangedEvent): Promise<void> {
  const channel = rabbitMQ.getChannel();

  channel.publish(
    'outpass.events',
    'outpass.status.changed',
    Buffer.from(JSON.stringify(event)),
    { persistent: true }
  );

  console.log(`📤 Published outpass status changed for outpass ${event.outpassId}`);
}
