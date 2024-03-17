import { connect, Connection, Channel, ConsumeMessage, Options } from "amqplib";

export interface IRabbitMQManagerConnect {
    hostname: string;
    port: number;
    username: string;
    password: string;
}
export interface IRabbitMQErrorHandlerFormat {}
export interface IRabbitMQResponseFormat {}
export interface IRabbitMQRequestFormat {}

export default class RabbitMQManager {
    protected connection: Connection | undefined;
    protected channel: Channel | undefined;

    constructor() {}

    public async connect(params: IRabbitMQManagerConnect): Promise<void> {
        this.connection = await connect(params);
        this.channel = await this.connection.createChannel();
    }
    public async disconnect(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }
    public bindQueue(queue: string, source: string, pattern: string) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.bindQueue(queue, source, pattern);
    }

    public async publish(
        queue: string,
        message: Record<string, any> | string,
        exchange = "",
        routingKey = "",
    ): Promise<any> {
        if (!this.channel) throw new Error("channel not created");
        const bufferMessage = Buffer.from(JSON.stringify(message));
        if (!exchange) return this.channel.sendToQueue(queue, bufferMessage);
        return this.channel.publish(exchange, routingKey, bufferMessage);
    }
    public async subscribe(
        queue: string,
        cb: (msg: ConsumeMessage | null) => void,
    ): Promise<void> {
        if (!this.channel) throw new Error("channel not created");
        await this.channel.consume(
            queue,
            (msg) => {
                cb(msg);
                if (msg) {
                    this.channel!.ack(msg);
                }
            },
            { noAck: false },
        );
    }
    public unsubscribe(queue: string) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.cancel(queue);
    }

    async close(): Promise<void> {
        if (this.channel) await this.channel.close();
        if (this.connection) await this.connection.close();
    }
    public assertQueue(queue: string, options?: Options.AssertQueue) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.assertQueue(queue, options);
    }
    public assertExchange(
        exchange: string,
        type: string,
        options?: Options.AssertExchange | undefined,
    ) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.assertExchange(exchange, type, options);
    }
    public deleteQueue(queue: string) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.deleteQueue(queue);
    }
    public deleteExchange(exchange: string) {
        if (!this.channel) throw new Error("channel not created");
        return this.channel.deleteExchange(exchange);
    }
}


export const defaultOptions: IRabbitMQManagerConnect = {
    hostname: 'localhost',
    port: 5672,
    username: "guest",
    password: "guest",
};