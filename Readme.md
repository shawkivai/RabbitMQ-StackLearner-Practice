# RabbitMQ Examples

This repository contains examples of using RabbitMQ with Node.js. The examples demonstrate different types of exchanges and how to send and receive messages using them.

## Examples

### Fanout Exchange

#### Emit Log
File: `4.fanout-exchange/emitLog.js`

This example demonstrates how to emit logs to a fanout exchange. The logs are broadcasted to all queues that are bound to the exchange.

#### Receive Log
File: `4.fanout-exchange/receiveLog.js`

This example demonstrates how to receive logs from a fanout exchange. A queue with a random name is created and bound to the exchange to receive all messages.

### Direct Exchange

#### Emit Log
File: `5.direct-exchange/emitLog.js`

This example demonstrates how to emit logs to a direct exchange. The logs are routed to queues based on the severity (routing key).

#### Receive Log
File: `5.direct-exchange/receiveLog.js`

This example demonstrates how to receive logs from a direct exchange. The queue is bound to the exchange with specific severities (routing keys) to receive messages.

Reference Video: https://www.youtube.com/watch?v=L-F5v0M7Z7U