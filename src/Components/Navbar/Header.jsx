import React from 'react';
import top1 from '/topleft.svg';
import top2 from '/topright.svg';
import top3 from '/logo-Sensors-Lab-white.png';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <div className="flex w-full justify-between bg-indigo-600">
      <img src={top1} alt="Top 1" viewBox="0 0 200 50" className="w-20 h-20" />
      <div></div>
      {/* <div className="w-3/4"></div> */}
      <header className="flex bg-black">
        <div className="flex justify-center items-center">
          <img
            src={top1}
            alt="Top 1"
            viewBox="0 0 200 50"
            className="w-40 sm:w-60 md:w-64 lg:w-100 h-20 object-cover"
          />
        </div>
        <div class="flex justify-center items-center">
          <img src={top3} alt="Top 3" class="w-auto h-20 object-contain" />
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
