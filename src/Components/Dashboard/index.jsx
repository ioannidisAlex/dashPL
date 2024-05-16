import { useEffect, useRef, useState } from "react";
import { useDashStore } from "../../store";
import { setSensorData, setAppendedData } from "../../store";
import { setZoomedIn } from "../../store";
import { setLeftRight, setRefAreaLeft, setRefAreaRight } from "../../store";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  LineChart,
  Line,
} from "recharts";

export const DashBoard = () => {
  const [newData, setNewData] = useState({});

  const sensorAllData = useDashStore((state) => state.sensorData.sensorAllData);

  const [data, setData] = useState(sensorAllData.slice(0, 4));

  const recData = useDashStore((state) => state.recInfo.recData);
  const isReccording = useDashStore((state) => state.recInfo.isRecording);

  const [mouseUped, setMouseUped] = useState(false);

  const {
    zoomedIn,
    zoomedOut,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
    top2,
    bottom2,
    left,
    right,
    // resetZoom,
  } = useDashStore((state) => state.zoom);

  const prevDeps = useRef([false, "dataMin", "dataMax"]);

  // creation of dummy data
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(sensorAllData.length + 1);
      setNewData({
        name: sensorAllData.length + 1, //`${
        uv: Math.floor(
          Math.random() * (1800 + (Math.floor(Math.random()*5) % 5 === 0 ? 4000 : 0)) + 5000
        ),
        pv: Math.floor(Math.random() * 1800 + 5000),
        amt: Math.floor(Math.random() * 8000 - 2000),
      });
    }, 2500);
    console.log(sensorAllData);
    return () => clearInterval(interval);
  }, [sensorAllData.length]);

  useEffect(() => {
    if (Object.keys(newData).length > 0) {
      setSensorData(newData);
      setAppendedData(newData);
    }
  }, [newData, setSensorData, setAppendedData]);

  useEffect(() => {
    if (zoomedOut && !zoomedIn) {
      setData(sensorAllData);
      setLeftRight("dataMin", "dataMax");
      //resetZoom();
      console.log("datachanged And out mode activated");
    }
  }, [zoomedOut, sensorAllData, zoomedIn]);

  useEffect(() => {
    function zoom() {
      if (refAreaLeft < refAreaRight) {
        setZoomedIn(true);
        setData(
          sensorAllData.filter(
            (entry) => entry.name >= refAreaLeft && entry.name <= refAreaRight
          )
        );
        setLeftRight(refAreaLeft, refAreaRight);
      }
    }
    if (
      prevDeps.current[0] !== mouseUped &&
      prevDeps.current[1] !== refAreaLeft &&
      prevDeps.current[2] !== refAreaRight
    ) {
      if (mouseUped) {
        zoom();
        setMouseUped(false);
        setRefAreaLeft("");
        setRefAreaRight("");
      }
      prevDeps.current = [false, refAreaLeft, refAreaRight];
    }
  }, [mouseUped, refAreaLeft, refAreaRight]);

  const handleMouseUp = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setRefAreaLeft("");
      setRefAreaRight("");
      return;
    }
    setMouseUped(true);
  };

  return (
    <div className="z-50 mt-4 rounded-lg bg-white py-6 shadow-2xl border border-black sm:px-6 h-[60vh] border-dashed">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          onAnimationStart={() => {}}
          animationDuration={0}
          width={500}
          height={300}
          data={data}
          onMouseDown={(e) => setRefAreaLeft(e.activeLabel)}
          onMouseMove={(e) => refAreaLeft && setRefAreaRight(e.activeLabel)}
          onMouseUp={handleMouseUp}
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
          <XAxis
            className="select-none"
            allowDataOverflow
            dataKey="name"
            domain={[left, right]}
            type="number"
            xAxisId="0"
          />
          <YAxis
            className="select-none"
            allowDataOverflow
            domain={[bottom, top]}
            yAxisId="5"
            type="number"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Line
            animationDuration={0}
            type="linear"
            dataKey="amt"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
            dot={{ strokeWidth: 0.2, stroke:"#555" , r: 4.3 - (3.1 * (1 - Math.exp(-0.05 * data.length))) }}
            xAxisId="0"
            yAxisId="5"
          />
          {/* <Line
            animationDuration={0}
            type="linear"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
            xAxisId="0"
            yAxisId="5"
          />
          <Line
            animationDuration={0}
            type="linear"
            dataKey="uv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
            xAxisId="0"
            yAxisId="5"
          /> */}
          {refAreaLeft && refAreaRight > refAreaLeft ? (
            <ReferenceArea
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
              yAxisId="5"
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
