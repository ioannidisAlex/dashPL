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
  const [data, setData] = useState(null);
  const originalData = useDashStore((state) => state.originalData);
  const isReccording = useDashStore((state) => state.recInfo.isRecording);

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
    // setRefAreaLeft,
    // setRefAreaRight,
    // setLeftRight,
    // resetZoom,
  } = useDashStore((state) => state.zoom);

  const prevDeps = useRef([false, "dataMin", "dataMax"]);

  const [recData, setRecData] = useState([]);

  useEffect(() => {
    const initialData = originalData.slice(0, count);
    setData(initialData);
  }, []);

  useEffect(() => {
    if (isReccording) {
      setRecData([...recData, originalData[originalData.length - 1]]);
    }
  }, [isReccording, originalData]);

  // dummy data
  useEffect(() => {
    // if activatedRecButton === ??
    // }
    const interval = setInterval(() => {
      setCount(count + 1);
      // every one second
      setDataAppending({
        name: `${originalData.length + 1}`,
        uv: Math.floor(
          Math.random() * (1800 + (count % 5 === 0 ? 4000 : 0)) + 5000
        ),
        pv: Math.floor(Math.random() * 1800 + 5000),
        amt: Math.floor(Math.random() * 8000 - 2000),
      });
    }, 7000);
    console.log(originalData);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (zoomedOut && !zoomedIn) {
        setData(originalData);
        setLeftRight("dataMin", "dataMax");
        //resetZoom();
        console.log("datachanged And out mode activated");
    }
  }, [zoomedOut, originalData]);

  const [mouseUped, setMouseUped] = useState(false);
  const zoom = () => {
    console.log(refAreaLeft, refAreaRight)
    if (refAreaLeft < refAreaRight) {
      setData(
        originalData.filter(
          (entry) => entry.name >= refAreaLeft && entry.name <= refAreaRight
        )
      );
      //[newLeft, newRight] = [refAreaRight, refAreaLeft];
      setLeftRight(refAreaLeft, refAreaRight);
      console.log("zooming");
      setZoomedIn(true);
    }
  };
  useEffect(() => {
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
          //data entry
          //data={data.slice(0, count)}
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
            type="number"
          />
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
            xAxis="0"
          />
          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
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
