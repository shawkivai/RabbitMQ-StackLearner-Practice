const amqp = require('amqplib');
const args = process.argv.slice(2);

const emitLog = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

        const exchange = 'direct_logs';
        const severity = args.length > 0 ? args[0] : 'info';
        const msg = args.slice(1).join(' ') || 'Hello World';

        await channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.publish(exchange, severity, Buffer.from(msg));
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