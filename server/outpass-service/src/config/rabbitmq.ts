import amqp, { Channel, Connection } from 'amqplib';
import { env } from './env';

class RabbitMQConnection {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();

      // Declare exchanges
      await this.channel.assertExchange('outpass.events', 'topic', { durable: true });
      await this.channel.assertExchange('attendance.events', 'topic', { durable: true });

      // Declare queues
      await this.channel.assertQueue('outpass.check-requests', { durable: true });
      await this.channel.assertQueue('outpass.status-changed', { durable: true });

      // Bind queues
      await this.channel.bindQueue(
        'outpass.check-requests',
        'outpass.events',
        'outpass.check.request'
      );

      console.log('✅ RabbitMQ connected successfully');
    } catch (error) {
      console.error('❌ RabbitMQ connection failed:', error);
      throw error;
    }
  }

  getChannel(): Channel {
    if (!this.channel) {
      throw new Error('RabbitMQ channel not initialized');
    }
    return this.channel;
  }

  async close(): Promise<void> {
    await this.channel?.close();
    await this.connection?.close();
  }
}

export const rabbitMQ = new RabbitMQConnection();
