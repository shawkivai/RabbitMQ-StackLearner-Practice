const amqp = require('amqplib');

async function send() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'task_queue';
        const msg = process.argv.slice(2).join(' ') || 'Hello World';
        await channel.assertQueue(queue, {
            durable: true
        });

        channel.sendToQueue(queue, Buffer.from(msg), {
            persistent: true
        });
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
