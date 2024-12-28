const amqp = require('amqplib/callback_api');

// Connect to RabbitMQ with Error First Callback
amqp.connect('amqp://localhost', (err0, connection) => {
    if (err0) {
        throw err0;
    }
    connection.createChannel((err1, channel) => {
        if (err1) {
            throw err1;
        }

        const queue = 'hello';
        const msg = 'Hello World';
        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(`Message sent ${msg}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});
