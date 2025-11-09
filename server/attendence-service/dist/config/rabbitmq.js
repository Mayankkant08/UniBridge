"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQ = void 0;
// src/config/rabbitmq.ts
const amqplib_1 = __importDefault(require("amqplib"));
const env_1 = require("./env");
class RabbitMQConnection {
    connection = null; // NOTE: ChannelModel, not Connection
    channel = null;
    async connect() {
        try {
            this.connection = await amqplib_1.default.connect(env_1.env.RABBITMQ_URL); // returns ChannelModel
            this.channel = await this.connection.createChannel();
            // Exchanges
            await this.channel.assertExchange('attendance.events', 'topic', { durable: true });
            await this.channel.assertExchange('outpass.events', 'topic', { durable: true });
            // Queues
            await this.channel.assertQueue('attendance.outpass-check-requests', { durable: true });
            await this.channel.assertQueue('attendance.outpass-check-responses', { durable: true });
            await this.channel.assertQueue('attendance.marked-events', { durable: true });
            // Bindings
            await this.channel.bindQueue('attendance.outpass-check-responses', 'outpass.events', 'outpass.check.response');
            // Optional: basic listeners for connection/channel lifecycle
            this.connection.on('close', () => console.error('RabbitMQ connection closed'));
            this.connection.on('error', (err) => console.error('RabbitMQ connection error:', err));
            this.channel.on('error', (err) => console.error('RabbitMQ channel error:', err));
            console.log('✅ RabbitMQ connected successfully');
        }
        catch (error) {
            console.error('❌ RabbitMQ connection failed:', error);
            throw error;
        }
    }
    getChannel() {
        if (!this.channel) {
            throw new Error('RabbitMQ channel not initialized');
        }
        return this.channel;
    }
    // Helper to publish to an exchange
    publish(exchange, routingKey, payload, options = { persistent: true }) {
        const ch = this.getChannel();
        ch.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)), options);
    }
    async close() {
        // Narrow types with guards to satisfy strict null checks
        if (this.channel) {
            await this.channel.close();
            this.channel = null;
        }
        if (this.connection) {
            await this.connection.close();
            this.connection = null;
        }
    }
}
exports.rabbitMQ = new RabbitMQConnection();
//# sourceMappingURL=rabbitmq.js.map