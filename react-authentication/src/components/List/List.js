import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "../../redux/listSlice";
import response from "../../Data/MOCK_DATA.json";
import FilterInput from "./FilterInput";
import PriceRangeInput from "./PriceRangeInput";
import SortBySelect from "./SortBySelect";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";

const List = () => {
  const navigate = useNavigate();

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
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  const itemsPerPage = 6;
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

    // Update filteredData with the sorted and filtered list
    setFilteredData(sortedList);

    // Calculate the new maximum page after filtering
    const newMaxPage = Math.ceil(sortedList.length / itemsPerPage);

    // Update currentPage if it is not valid for the new filtered list
    if (currentPage > newMaxPage) {
      setCurrentPage(1);
    }

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = sortedList.slice(startIndex, endIndex);

    setPaginatedData(paginatedList);
  }, [list, filter, sortType, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const navigateToMain = () => {
    navigate("/user");
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredData.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const itemsArray = new Array(6).fill(null);

  // Fill the array with actual items if available
  for (let i = 0; i < Math.min(paginatedData.length, 6); i++) {
    itemsArray[i] = paginatedData[i];
  }
  return (
    <div
      style={{
        backgroundImage: `url('/bg.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container" style={{ minHeight: "100vh" }}>
        <div
          className="row d-flex justify-content-between"
          style={{ minHeight: "90vh" }}
        >
          <div className="col-md-12">
            <div className="bg-white rounded bg-opacity-50 p-3 mb-1 mt-1 text-center d-flex justify-content-between">
              <h1>List Component</h1>
              <button
                className="btn btn-secondary "
                onClick={navigateToMain}
                style={{ minWidth: "120px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house-door-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-md-3">
            {/* Filter Inputs */}
            <div className="bg-white p-5 rounded bg-opacity-50 mt-1">
              <FilterInput
                type="text"
                placeholder="Name or Brand Name"
                name="name"
                value={filter.name}
                onChange={handleFilterChange}
              />
              <FilterInput
                type="text"
                placeholder="Brand Name"
                name="brandName"
                value={filter.brandName}
                onChange={handleFilterChange}
              />
              <PriceRangeInput
                placeholder="Price"
                name={["minPrice", "maxPrice"]}
                value={[filter.minPrice, filter.maxPrice]}
                onChange={handleFilterChange}
              />
              <FilterInput
                type="text"
                placeholder="Color"
                name="color"
                value={filter.color}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="col-md-9">
            {/* List Content */}
            <div className="bg-white p-5 rounded bg-opacity-50 mt-1">
              <div className="d-flex flex-row-reverse bd-highlight">
                <SortBySelect value={sortType} onChange={handleSortChange} />
              </div>
              <div className="col-md-12">
                <div className="row d-flex justify-content-around">
                  {itemsArray.map((item, index) => (
                    <ListItem
                      key={index}
                      item={
                        item || {
                          id: index,
                          name: "",
                          brandName: "",
                          price: 0,
                          color: "",
                        }
                      }
                    />
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <button
                    className="btn btn-primary"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={{ minWidth: "120px" }}
                  >
                    &lt; Previous
                  </button>
                  <button
                    className="btn btn-secondary disabled"
                    style={{ minWidth: "120px" }}
                  >
                    <span>Page {currentPage}</span>
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextPage}
                    style={{ minWidth: "120px" }}
                    disabled={
                      currentPage ===
                      Math.ceil(filteredData.length / itemsPerPage)
                    }
                  >
                    Next &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
