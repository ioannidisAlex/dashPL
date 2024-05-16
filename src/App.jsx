import { useState } from "react";
import "./output.css";
import { setDialogState, setZoomedOut, useDashStore } from "./store";
import { Header } from "./Components/Navbar/Header";
import { Dialog } from "./Components/Dialog";
import { Button } from "./Components/Button";
import { RecButton } from "./Components/Navbar/RecButton";
import { DashBoard } from "./Components/Dashboard";

function App() {
  const zoomedIn = useDashStore((state) => state.zoom.zoomedIn);
  return (
    <div className="h-screen relative flex flex-col justify-between ">
      <Dialog />
      <div>
        <Header />
        <div className=" h-52 z-50">
          <div className=" py-10 px-20 ">
            <div className="flex justify-between">
              <h1 className="tracking-tight text-3xl font-semibold">
                temprature
              </h1>

              {zoomedIn ? (
                <Button
                  label="Zoom Out"
                  onClick={() => {
                    setZoomedOut(true);
                  }}
                />
              ) : (
                <div></div>
              )}
              <div className=" flex">
                <RecButton />

                <Button
                  label="Edit"
                  onClick={() => {
                    setDialogState(true);
                  }}
                />
              </div>
            </div>
            <DashBoard />
          </div>
        </div>
      </div>
      <footer>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1220 240"
          className="w-full z-20"
        >
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#1a192c" stopOpacity="0.2" />
              <stop offset="10%" stopColor="#1a192c" stopOpacity="0.25" />
              <stop offset="20%" stopColor="#1a192c" stopOpacity="0.05" />
              <stop offset="30%" stopColor="#1a192c" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#1a192c" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            className="h-20 z-20"
            // fill="url(#gradient)"
            fill="#1a192c"
            d="M0,96L18.5,117.3C36.9,139,74,181,111,202.7C147.7,224,185,224,222,218.7C258.5,213,295,203,332,186.7C369.2,171,406,149,443,138.7C480,128,517,128,554,133.3C590.8,139,628,149,665,160C701.5,171,738,181,775,208C812.3,235,849,277,886,256C923.1,235,960,149,997,138.7C1033.8,128,1071,192,1108,224C1144.6,256,1182,256,1218,229.3C1255.4,203,1292,149,1329,144C1366.2,139,1403,181,1422,202.7L1440,224L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"
          ></path>
        </svg>
      </footer>
    </div>
  );
}

export default App;
