const amqp = require('amqplib');

const receiveLog = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'logs';

        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        // create a queue with a random name by passing empty string
        const queue = await channel.assertQueue('', {
            exclusive: true
        });

        console.log(`Binding queue ${queue.queue} to exchange ${exchange}`);
        channel.bindQueue(queue.queue, exchange, '');

        channel.consume(queue.queue, (msg) => {
            if (msg !== null) {
                console.log(`Received ${msg.content.toString()}`);
            }
        }, {
            noAck: true
        });
    } catch (err) {
        console.error(err);
    }
}


receiveLog();