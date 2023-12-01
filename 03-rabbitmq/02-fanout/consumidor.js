const amqp = require("amqplib");
const args = process.argv.slice(2);

(async () => {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "exchange-fanout";
    await channel.assertExchange(exchangeName, "fanout", { durable: true });

    /* exclusive solo con esa conexion */
    const assertQueue = await channel.assertQueue("", { exclusive: true });
    /* Vincular cola con intercambiador */
    await channel.bindQueue(assertQueue.queue, exchangeName, "");

    const noAck = args.length > 0 ? true : false;

    channel.consume(
        assertQueue.queue,
        (message) => console.log(message.content.toString()),
        { noAck }
    );
})();
