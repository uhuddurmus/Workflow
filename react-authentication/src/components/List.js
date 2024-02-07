import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../redux/listSlice";
import response from "../Data/MOCK_DATA.json";

const List = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.list.items);
  const [sortType, setSortType] = useState("default"); // Default sorting
  const [filteredData, setFilteredData] = useState([...list]);
  const [filter, setFilter] = useState({
    name: "",
    brandName: "",
    minPrice: "",
    maxPrice: "",
    color: "",
  });

  console.log(response);
  useEffect(() => {
    const data = response;
    dispatch(setList(data));
  }, [dispatch]);

  useEffect(() => {
    // Filtreleme işlemleri
    const filteredList = list.filter((item) => {
      const nameCondition =
        item.name.toLowerCase().includes(filter.name.toLowerCase()) ||
        item.brandName.toLowerCase().includes(filter.name.toLowerCase());

      const brandCondition = item.brandName
        .toLowerCase()
        .includes(filter.brandName.toLowerCase());

      const priceCondition =
        (!filter.minPrice || item.price >= parseFloat(filter.minPrice)) &&
        (!filter.maxPrice || item.price <= parseFloat(filter.maxPrice));

      const colorCondition =
        !filter.color ||
        item.color.toLowerCase().includes(filter.color.toLowerCase());

      return (
        nameCondition && brandCondition && priceCondition && colorCondition
      );
    });

    // Sorting
    const sortedList = [...filteredList].sort((a, b) => {
      switch (sortType) {
        case "name":
          return a.name.localeCompare(b.name);
        case "brandName":
          return a.brandName.localeCompare(b.brandName);
        case "color":
          return a.color.localeCompare(b.color);
        case "price":
          return a.price - b.price;
        default:
          return a.id - b.id; // Default sorting by ID
      }
    });

    setFilteredData(sortedList);
  }, [list, filter, sortType]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };
  return (
    <div>
      <h1>List Component</h1>

      {/* Filtreleme İnputları */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Name or Brand Name"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Brand Name"
          name="brandName"
          value={filter.brandName}
          onChange={handleFilterChange}
        />
      </div>
      <div className="mb-3">
        <label>Price Range:</label>
        <div className="d-flex">
          <input
            type="number"
            className="form-control mr-2"
            placeholder="Min Price"
            name="minPrice"
            value={filter.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            name="maxPrice"
            value={filter.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Color"
          name="color"
          value={filter.color}
          onChange={handleFilterChange}
        />
      </div>
      <div className="mb-3">
        <label>Sort By:</label>
        <select
          className="form-control"
          value={sortType}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="brandName">Brand Name</option>
          <option value="price">Price</option>
          <option value="color">Color</option>
        </select>
      </div>
      {/* Liste İçeriği */}
      <ul className="list-group">
        {filteredData.map((item) => (
          <li key={item.id} className="list-group-item">
            <strong>{item.name}</strong> - {item.brandName}, ${item.price},{" "}
            {item.color}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
