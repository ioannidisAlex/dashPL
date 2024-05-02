import { useEffect, useState } from 'react';
import './output.css';
import { Header } from './Components/Navbar/Header';
import { RecButton } from './Components/Navbar/RecButton';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page F',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page X',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method

    if (count >= data.length) return;
    const interval = setInterval(() => {
      setCount(count + 1);
      // every one second
    }, 1000);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="h-screen flex flex-col justify-between relative">
      <div>
        <Header />
        <div className="bg-black h-52 z-50">
          <div className=" py-10 px-20 ">
            <div className="flex justify-between">
              <h1 className="tracking-tight text-3xl font-bold">Dashboard</h1>
              <RecButton />
            </div>
            <div className="relative mt-4 rounded-lg bg-black py-6 shadow-2xl border border-white sm:px-6 h-[60vh] border-dashed z-50">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  onAnimationStart={() => {
                    console.log('eo');
                  }}
                  animationDuration={0}
                  width={500}
                  height={300}
                  // Edw bainoun ta data
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Line
                    animationDuration={0}
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Line
                    animationDuration={0}
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1220 320"
          className="w-full z-20"
        >
          <path
            className="fill-black h-20 z-20"
            // fill-opacity="1"
            d="M0,96L18.5,117.3C36.9,139,74,181,111,202.7C147.7,224,185,224,222,218.7C258.5,213,295,203,332,186.7C369.2,171,406,149,443,138.7C480,128,517,128,554,133.3C590.8,139,628,149,665,160C701.5,171,738,181,775,208C812.3,235,849,277,886,256C923.1,235,960,149,997,138.7C1033.8,128,1071,192,1108,224C1144.6,256,1182,256,1218,229.3C1255.4,203,1292,149,1329,144C1366.2,139,1403,181,1422,202.7L1440,224L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
          ></path>
        </svg>
      </footer>
    </div>
  );
}

export default App;
