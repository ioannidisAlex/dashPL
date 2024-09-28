import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    console.log("Payload", payload)
    return (
      <div className="custom-tooltip">
        {payload[0] && <p>{`Humidity: ${payload[0].value}%`}</p>}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
