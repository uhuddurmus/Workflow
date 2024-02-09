import React from "react";

const SortBySelect = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <label>Sort By:</label>
      <select className="form-control" value={value} onChange={onChange}>
        <option value="default">Default</option>
        <option value="name">Name</option>
        <option value="brandName">Brand Name</option>
        <option value="price">Price</option>
        <option value="color">Color</option>
      </select>
    </div>
  );
};

export default SortBySelect;
