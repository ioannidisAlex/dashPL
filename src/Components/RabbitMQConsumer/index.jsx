import { useEffect, useState } from 'react';
import amqp from 'amqplib';

export const RabbitMQConsumer = () => {
    const [messages, setMessages] = useState([]);
    const queueName = 'f_queue';
  
    const establishConnection = async () => {
        try {
            const connection = await amqp.connect(process.env.REACT_APP_CLOUDAMQP_URL);
            const channel = await connection.createChannel();
            await channel.assertQueue(queueName);
            return { connection, channel };
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            return null; // handle the error waymindfully
        }
    };

    const startConsuming = async (channel) => {
        channel.consume(queueName, (message) => {
            const data = message.content.toString();
            setMessages(prevMessages => [...prevMessages, data]);
            channel.ack(message);
        }, { noAck: false });
    };

    useEffect(() => {
        let connection, channel;

        const initialize = async () => {
            const result = await establishConnection();
            if (result) {
                connection = result.connection;
                channel = result.channel;
                startConsuming(channel);
            }
        };
        initialize();

        return () => {
            if (channel) {
                channel.close();
            }
            if (connection) {
                connection.close();
            }
        };
    }, []);

    return (
        <div>
            <h2>Received Messages:</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};