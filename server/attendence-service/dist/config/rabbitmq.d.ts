import { Channel, Options } from 'amqplib';
declare class RabbitMQConnection {
    private connection;
    private channel;
    connect(): Promise<void>;
    getChannel(): Channel;
    publish(exchange: string, routingKey: string, payload: unknown, options?: Options.Publish): void;
    close(): Promise<void>;
}
export declare const rabbitMQ: RabbitMQConnection;
export {};
//# sourceMappingURL=rabbitmq.d.ts.map