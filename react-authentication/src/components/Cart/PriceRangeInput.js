import React from "react";
import Slider from "@mui/material/Slider";

const PriceRangeInput = ({ placeholder, name, value, onChange }) => {
  const handleSliderChange = (event, newValue) => {
    onChange({
      target: { name: name[0], value: newValue[0] },
    });
    onChange({
      target: { name: name[1], value: newValue[1] },
    });
  };

  return (
    <div className="mb-3">
      <label>Price Range:</label>

      <Slider
        value={value}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
        min={0}
        max={10000}
        step={1}
      />
    </div>
  );
};

export default PriceRangeInput;
