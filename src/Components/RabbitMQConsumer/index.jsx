import { useEffect, useState } from 'react';
import mqtt from 'mqtt';

function RabbitMQConsumer() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Disconnected');
  const topic = 'my/topic';
  const [client, setClient] = useState(null); // Store MQTT client in state

  useEffect(() => {
    // Connect to RabbitMQ via Web-MQTT
    const mqttClient = mqtt.connect('ws://localhost:15675/ws', {
      username: 'guest',
      password: 'guest',
      reconnectPeriod: 1000,
    });

    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('Connected to RabbitMQ via Web-MQTT');
      setStatus('Connected');

      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error('Subscription error:', err);
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      setMessages(prev => [...prev, message.toString()]);
    });

    mqttClient.on('error', (error) => {
      console.error('Connection error:', error);
      setStatus('Connection error');
    });

    mqttClient.on('close', () => {
      console.log('Connection to RabbitMQ closed');
      setStatus('Disconnected');
    });

    // Cleanup
    return () => {
      mqttClient.end();
      setClient(null);
    };
  }, [topic]);

  return (
    <div>
      <h2>Status: {status}</h2>
      <h2>Received Messages:</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default RabbitMQConsumer;
