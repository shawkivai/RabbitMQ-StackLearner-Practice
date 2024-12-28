const amqp = require('amqplib');

async function receive() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'hello';
        await channel.assertQueue(queue, {
            durable: false
        });

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
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

receive();
