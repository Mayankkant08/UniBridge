//server/attendence-service/src/events/consumers.ts
import { rabbitMQ } from '../config/rabbitmq';
import { outpassCheckService } from '../services/outpass-check.service';
import { OutpassCheckResponseEvent } from '../types';

export async function startConsumers(): Promise<void> {
  const channel = rabbitMQ.getChannel();

  channel.consume('attendance.outpass-check-responses', async (msg) => {
    if (msg) {
      try {
        const response: OutpassCheckResponseEvent = JSON.parse(msg.content.toString());
        console.log(`📥 Received outpass check response for student ${response.studentId}`);

        outpassCheckService.handleOutpassResponse(response);

        channel.ack(msg);
      } catch (error) {
        console.error('Error processing outpass response:', error);
        channel.nack(msg, false, false);
      }
    }
  });

  console.log('👂 Started listening for outpass check responses');
}
