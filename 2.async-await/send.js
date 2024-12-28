const amqp = require('amqplib');

async function send() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';
        const msg = 'Hello World';
        await channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(`Message sent ${msg}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (err) {
        console.error(err);
    }
}

send();
