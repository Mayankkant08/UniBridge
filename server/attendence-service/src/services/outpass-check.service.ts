//server/attendence-service/src/services/outpass-check.service.ts

import { v4 as uuidv4 } from 'uuid';
import { rabbitMQ } from '../config/rabbitmq';
import { OutpassCheckRequestEvent, OutpassCheckResponseEvent } from '../types';

export class OutpassCheckService {
  private pendingRequests: Map<string, (response: OutpassCheckResponseEvent) => void> = new Map();

  async checkStudentOutpassStatus(studentId: string): Promise<OutpassCheckResponseEvent> {
    const requestId = uuidv4();

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(requestId);
        reject(new Error('Outpass check request timeout'));
      }, 5000);

      this.pendingRequests.set(requestId, (response) => {
        clearTimeout(timeout);
        resolve(response);
      });

      const event: OutpassCheckRequestEvent = {
        studentId,
        requestId,
        timestamp: new Date(),
      };

      const channel = rabbitMQ.getChannel();
      channel.publish(
        'outpass.events',
        'outpass.check.request',
        Buffer.from(JSON.stringify(event)),
        { persistent: true }
      );
    });
  }

  handleOutpassResponse(response: OutpassCheckResponseEvent): void {
    const resolver = this.pendingRequests.get(response.requestId);
    if (resolver) {
      resolver(response);
      this.pendingRequests.delete(response.requestId);
    }
  }
}

export const outpassCheckService = new OutpassCheckService();
