const amqp = require('amqplib');

// if worker is down then the next running worker will take the message and process it 
// this is called round robin routing and here we showed this using exit keyword in worker
async function worker() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'task_queue';
        await channel.assertQueue(queue, {
            durable: true
        });
        // till i acknoledge the message, i will not receive another message
        channel.prefetch(1);

        channel.consume(queue, (msg) => {
            if (msg !== null) {
                console.log(`Received ${msg.content.toString()}`);
            }
            const secs = msg.content.toString().split('.').length - 1;

            const exit = process.argv.slice(2).join(' ');
            console.log(exit);
            if (exit === 'exit') {
                console.log('Exiting');
                process.exit(0);
            }
           

            setTimeout(() => {
                console.log(`Done in ${secs} seconds`);
                channel.ack(msg);
            }, secs * 1000);
        }, {
            noAck: false
        });

    } catch (err) {
        console.error(err);
    }
}

worker();
