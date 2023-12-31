import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import { BrokerRepository } from "../domain/repositories/broker.repository";
import ReceiveMessageService from "./services/receive-message.service";

export class BrokerInfrastructure implements BrokerRepository {
  async sent(message: unknown): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const queueName = process.env.QUEUE_NAME || "order";
    await channel.assertQueue(queueName, { durable: true });
    return channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }
  async receive(): Promise<unknown> {
    const channel = BrokerBootstrap.channel;
    const exchangeName = process.env.EXCHANGE_NAME || "exchange-order";
    const exchangeType = process.env.EXCHANGE_TYPE || "fanout";
    const routingKey = process.env.ROUTING_KEY || "*.order";

    return await ReceiveMessageService.orderConfirmed(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType,
      routingKey
    );
  }

  async consumerOrderConfirmed(message: any) {
    const messageParse = JSON.parse(message.content.toString());
    console.log(messageParse);

    BrokerBootstrap.channel.ack(message);
  }
}
