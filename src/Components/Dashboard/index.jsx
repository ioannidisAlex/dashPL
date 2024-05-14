import { useEffect, useRef, useState } from "react";
import { useDashStore } from "../../store";
import { setDataAppending } from "../../store";
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
  const [count, setCount] = useState(4);
  
  const sensorAllData = useDashStore((state) => state.sensorAllData);

  const [data, setData] = useState(sensorAllData.slice(0, count));
  
  
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

  // kateu8eian sto store
  const [recData, setRecData] = useState([]);

  useEffect(() => {
    if (isReccording) {
      setRecData([...recData, sensorAllData[sensorAllData.length - 1]]);
    }
  }, [isReccording, sensorAllData]);

  // dummy data
  useEffect(() => {
    // if activatedRecButton === ??
    // }
    const interval = setInterval(() => {
      setCount(count + 1);
      // every one second
      setDataAppending({
        name: `${sensorAllData.length + 1}`,
        uv: Math.floor(
          Math.random() * (1800 + (count % 5 === 0 ? 4000 : 0)) + 5000
        ),
        pv: Math.floor(Math.random() * 1800 + 5000),
        amt: Math.floor(Math.random() * 8000 - 2000),
      });
    }, 2500);
    console.log(sensorAllData);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (zoomedOut && !zoomedIn) {
        setData(sensorAllData);
        setLeftRight("dataMin", "dataMax");
        //resetZoom();
        console.log("datachanged And out mode activated");
    }
  }, [zoomedOut, sensorAllData]);


  useEffect(() => {
    function zoom() {
      console.log(refAreaLeft, refAreaRight)
      if (refAreaLeft < refAreaRight) {
        setData(
          sensorAllData.filter(
            (entry) => entry.name >= refAreaLeft && entry.name <= refAreaRight
          )
        );
        setLeftRight(refAreaLeft, refAreaRight);
        console.log("zooming");
        setZoomedIn(true);
      }
    }
    console.log(prevDeps.current);
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
    <div className=" mt-4 rounded-lg bg-black py-6 shadow-2xl border border-white sm:px-6 h-[60vh] border-dashed z-50">
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
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              xAxisId="0"
              yAxisId="5"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
