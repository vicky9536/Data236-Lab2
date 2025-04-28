const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();

const sendOrderCreatedEvent = async (order) => {
  try {
    console.log('Connecting producer to Kafka...');
    await producer.connect();
    console.log('Producer connected.');

    console.log('Sending order created event to Kafka...');
    await producer.send({
      topic: 'order-events',
      messages: [
        { value: JSON.stringify(order) },
      ],
    });
    console.log('Successfully sent order event to Kafka:', order);

    await producer.disconnect();
    console.log('Producer disconnected.');
  } catch (error) {
    console.error('Error in sending Kafka message:', error);
  }
};

module.exports = { sendOrderCreatedEvent };
