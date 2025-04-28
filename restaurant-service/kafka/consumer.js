const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'restaurant-service',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({ groupId: 'restaurant-group' });

const runConsumer = async () => {
  try {
    console.log('Connecting consumer to Kafka...');
    await consumer.connect();
    console.log('Consumer connected.');

    console.log('Subscribing to topic: order-events...');
    await consumer.subscribe({ topic: 'order-events', fromBeginning: true });
    console.log('Subscribed to topic: order-events.');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log('Received Kafka message:');
        console.log(`- Topic: ${topic}`);
        console.log(`- Partition: ${partition}`);
        console.log(`- Message: ${message.value.toString()}`);
      },
    });
  } catch (error) {
    console.error('Error in Kafka consumer:', error);
  }
};

module.exports = { runConsumer };
