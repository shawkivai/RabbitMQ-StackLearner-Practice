const amqp = require('amqplib');

const args = process.argv.slice(2);

if(args.length === 0) {
    console.log('Usage: receiveLog.js [info] [warning] [error]');
    process.exit(1);
}

const receiveLog = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'direct_logs';

        await channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        // create a queue with a random name by passing empty string
        const queue = await channel.assertQueue('', {
            exclusive: true
        });

        console.log(`Binding queue ${queue.queue} to exchange ${exchange}`);

        args.forEach(severity => {
            channel.bindQueue(queue.queue, exchange, severity);
        });

        channel.consume(queue.queue, (msg) => {
            if (msg !== null) {
                console.log(`Received ${msg.content.toString()}`, msg.fields.routingKey, msg.fields.exchange);
            }
        }, {
            noAck: true
        });
    } catch (err) {
        console.error(err);
    }
}


receiveLog();