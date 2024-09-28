import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

function RabbitMQProducer() {
  const [message, setMessage] = useState('');
  const [client, setClient] = useState(null);

  const sendMessage = () => {
    if (message.trim() === '') return;

    // Publish the message via MQTT
    if (client) {
      client.publish('my/topic', message, { qos: 1 }, (error) => {
        if (error) {
          console.error('Error publishing message:', error);
        } else {
          console.log(`Message "${message}" sent to topic "my/topic"`);
        }
      });
    } else {
      console.error('MQTT client is not connected');
    }

    // Clear the input field
    setMessage('');
  };

  useEffect(() => {
    // Connect to MQTT over WebSocket
    const mqttClient = mqtt.connect('ws://localhost:15675/ws', {
      username: 'guest', // Replace with your username
      password: 'guest'  // Replace with your password
    });

    mqttClient.on('connect', () => {
      console.log('MQTT connected');
      setClient(mqttClient); // Store the MQTT client reference
    });

    mqttClient.on('error', (error) => {
      console.error('MQTT connection error:', error);
    });

    // Cleanup function to close the MQTT connection
    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default RabbitMQProducer;
