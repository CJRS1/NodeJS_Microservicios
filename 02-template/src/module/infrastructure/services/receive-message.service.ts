import amqp from 'amqplib';

export default class ReceiveMessageService {
  static async orderConfirmed(
    channel: amqp.Channel,
    cb: (message: unknown) => void,
    exchangeName: string,
    exchangeType: string,
    routingKey: string
  ) {
    /* Conexion al interambiador y me asegurio  que al canal exista */
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });

    const assertQueue = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(assertQueue.queue, exchangeName, routingKey);

    /* noacK false para que no confirme */
    channel.consume(assertQueue.queue, (message) => cb(message), {
      noAck: false,
    });
  }
}
