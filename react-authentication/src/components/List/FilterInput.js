import React from "react";

const FilterInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterInput;
