const amqp = require('amqplib');

const emitLog = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'logs';
        const msg = process.argv.slice(2).join(' ') || 'Hello World';

        await channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.publish(exchange, '', Buffer.from(msg));
        console.log(`Message sent ${msg}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);    
    } catch (err) {
        console.error(err);
    }
}

emitLog();