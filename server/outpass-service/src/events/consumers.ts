import { rabbitMQ } from '../config/rabbitmq';
import { outpassService } from '../services/outpass.service';
import { publishOutpassCheckResponse } from './publishers';
import { OutpassCheckRequestEvent } from '../types';

export async function startConsumers(): Promise<void> {
  const channel = rabbitMQ.getChannel();

  // Listen for outpass check requests from attendance service
  channel.consume('outpass.check-requests', async (msg) => {
    if (msg) {
      try {
        const request: OutpassCheckRequestEvent = JSON.parse(msg.content.toString());
        console.log(`📥 Received outpass check request for student ${request.studentId}`);

        // Check if student is on outpass
        const result = await outpassService.isStudentOnOutpass(request.studentId);

        // Send response back
        await publishOutpassCheckResponse({
          studentId: request.studentId,
          requestId: request.requestId,
          isOnOutpass: result.isOnOutpass,
          outpassDetails: result.outpassDetails,
        });

        channel.ack(msg);
      } catch (error) {
        console.error('Error processing outpass check request:', error);
        channel.nack(msg, false, false);
      }
    }
  });

  console.log('👂 Started listening for outpass check requests');
}
