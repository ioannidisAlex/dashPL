import React, { memo } from 'react';
import { fromUnixTime, getHours, getMinutes, getSeconds } from 'date-fns';

const CustomTooltip = memo(({ active, payload }) => {
  let timeShow = '';
  let bigSeconds = '';
  let hoursAndMinutes = '';
  if (active && payload && payload.length) {
    const epoch = payload[0]?.payload.name;

    if (!isNaN(epoch)) {
      const utcDate = fromUnixTime(epoch/1000);
      const hours = getHours(utcDate)
      const minutes = getMinutes(utcDate);
      const seconds = getSeconds(utcDate);
      hoursAndMinutes = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      bigSeconds = `${seconds.toString().padStart(2, '0')}`
      timeShow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}.${seconds.toString().padStart(2, '0')}"`;
    } else {
      timeShow = epoch;
    }

    return (
      <div className="bg-white border border-gray-200 rounded-md p-3 shadow-md z-20">
        <p className="text-gray-800 mb-2 flex items-center"> 
          <span className='text-sm'>{hoursAndMinutes}</span>
          <span className="mx-1">.</span>
          <span className="font-semibold ml-1">{bigSeconds}</span>
          <span className="font-semibold">"</span>
        </p> 
        <p className="text-blue-500 text-sm flex items-center"> 
          Humidity: <span className="ml-1 font-medium">{payload[0].value}%</span> 
        </p>
      </div>
    );
  }
  return null;
});

export default CustomTooltip;