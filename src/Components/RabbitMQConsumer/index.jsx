import { useEffect, useState } from 'react';
import { useDashStore } from "../../store";
import { updateLineData, setAppendedData } from "../../store";
import mqtt from 'mqtt';

function RabbitMQConsumer() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Disconnected');
  const topic = 'my/topic';
  const [client, setClient] = useState(null); // Store MQTT client in state

  const [newData, setNewData] = useState({});
  const sensorAllData = useDashStore((state) => state.sensorData.lines[1].data);

  useEffect(() => {
    if (Object.keys(newData).length > 0) {
      updateLineData(newData, 1);
      setAppendedData(newData, 1);
    }
  }, [newData, updateLineData, setAppendedData]);

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
      try {
        const jsonData = JSON.parse(message.toString());
  
        const timestamp = new Date(jsonData.timestamp);
        const withoutmsTimestamp = timestamp.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short'
        });
        const milliseconds = timestamp.getMilliseconds().toString().padStart(3, '0');

        //const minutesSeconds = `${timestamp.getMinutes()}.${timestamp.getSeconds().toString().padStart(2, '0')}`;
        const epoch = (Math.floor(timestamp.getTime()));
        //console.log(epoch);
        setNewData({
          name: epoch,
          uv: 2730,
          pv: jsonData.humidity,
          val: 2030, 
        });
        console.log(sensorAllData)

        setMessages(prev => [...prev, JSON.stringify(jsonData)]);
      } catch (error) {
        console.error('Error parsing JSON or handling timestamp:', error);        }
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
  }, [sensorAllData.length, topic]);

  return (
    <></>
  );
}

export default RabbitMQConsumer;
