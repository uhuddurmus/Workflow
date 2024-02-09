import React, { useState } from "react";

const ListItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      key={item.id}
      className={`rounded col-md-3 m-1 ${
        isHovered ? "" : "bg-opacity-50"
      } bg-primary`}
      style={{ minHeight: "30vh", cursor: "pointer" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src="./car.png" className="card-img-top" alt={item.name} />
      <strong>{item.name}</strong>
      <br />
      {item.brandName}, ${item.price}, {item.color}
    </div>
  );
};

export default ListItem;
