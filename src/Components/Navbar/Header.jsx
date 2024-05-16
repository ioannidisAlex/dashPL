import React from "react";
import top1 from "/topleft.svg";
import top2 from "/topright.svg";
import top3 from "/logo-Sensors-Lab-white.png";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <div
      className="flex w-full justify-between"
      style={{ backgroundColor: "#1a192c", paddingTop: "0.6rem", paddingBottom: "1.2rem" }}
    >
      <img src={top1} alt="Top 1" viewBox="0 0 200 50" className="w-20 h-20" />
      <div></div>
      {/* //uncomment the above line  */}
      {/* <div className="w-3/4"></div> */}
      <header
        className="flex"
        style={{ paddingLeft: "5rem", paddingRight: "5rem", opacity: 0.8 }}
      >
        <div className="flex justify-center items-center">
          <div
            className="absolute text-white"
            style={{
              opacity: "75%",
              marginRight: "2.5rem",
              fontSize: '80%',
            }}
          >
          {/* &emsp;&emsp;&emsp;Dash<br /> <br /> Metsoivio University */}
          </div>
          <img
            src={top1}
            alt="Top 1"
            viewBox="0 0 200 50"
            className="w-40 sm:w-60 md:w-64 lg:w-100 h-20 object-cover"
          />
        </div>
        <div className="flex justify-center items-center">
          <img src={top3} alt="Top 3" className="w-auto h-20 object-contain" />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={top2}
            alt="Top 2"
            viewBox="0 0 200 50"
            className="w-40 sm:w-60 md:w-64 lg:w-82 h-20 object-cover"
          />
        </div>
      </header>
      <div> </div>
      <Navbar />
    </div>
  );
};

export default Header;
