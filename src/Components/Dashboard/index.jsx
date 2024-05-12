import { useEffect, useState } from "react";
import { useDashStore } from '../../store';
import {
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const DashBoard = () => {
  const [count, setCount] = useState(4);
  const [data, setData] = useState([
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 6800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ]);
  const isReccording = useDashStore((state) => state.recInfo.isRecording);
  const [recData, setRecData] = useState([]);
  
  useEffect(() => {
    if (isReccording) {
      setRecData([...recData, data[data.length - 1]]);
    }
  }, [isReccording, data]);

  // dummy data
  useEffect(() => {
    // if activatedRecButton === ??
    // }
   
    const interval = setInterval(() => {
        setCount(count + 1);
        // every one second
        setData((prevData) => [
            ...prevData,
            {
                name: `Page ${prevData.length + 1}`,
                uv: Math.floor(Math.random() * (1800 + (count % 5 === 0 ? 4000 : 0)) + 5000),
                pv: Math.floor(Math.random() * 1800 + 5000),
                amt: Math.floor(Math.random() * 8000 - 2000),
            },
        ]);
    }, 10000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className=" mt-4 rounded-lg bg-black py-6 shadow-2xl border border-white sm:px-6 h-[60vh] border-dashed z-50">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          onAnimationStart={() => {
          }}
          animationDuration={0}
          width={500}
          height={300}
          //data entry
          data={data.slice(0, count)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f3e00a" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f3e00a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#01cbdd" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#01cbdd" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis className="select-none" dataKey="name" />
          <YAxis className="select-none" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {/* <Line
            animationDuration={0}
            type="linear"
            dataKey="amt"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Line
            animationDuration={0}
            type="linear"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        <Line
            animationDuration={0}
            type="linear"
            dataKey="uv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        <Brush />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
