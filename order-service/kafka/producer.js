const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const sendOrderCreatedEvent = async (order) => {
  await producer.connect();
  await producer.send({
    topic: 'order-events',
    messages: [
      { value: JSON.stringify(order) },
    ],
  });
  await producer.disconnect();
};

module.exports = { sendOrderCreatedEvent };
