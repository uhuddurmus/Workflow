import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilterInput from "./FilterInput";
import PriceRangeInput from "./PriceRangeInput";
import SortBySelect from "./SortBySelect";
import ListItem from "./ListItem";
import { useNavigate } from "react-router-dom";
import { selectUser, logoutUser } from "../../redux/slices/authSlice";
import { selectIsAdmin } from "../../redux/slices/authSlice";
import AdminIcon from "../AdminIcon";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.cart.items);
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
  const user = useSelector(selectUser);
  const admin = useSelector(selectIsAdmin);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/admin");

    // You can redirect to the login page or perform any other actions after logout
  };
  const handleGoUser = () => {
    navigate("/user"); // You can redirect to the login page or perform any other actions after logout
  };
  const navigateToMain = () => {
    navigate("/admin");
  };
  const navigateToCart = () => {
    navigate("/cart");
  };
  const navigateToList = () => {
    navigate("/list");
  };
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
              <h1>Cart Component</h1>
              <div>
                <button
                  className={`btn btn-secondary m-1 ${(user.role = "admin"
                    ? ""
                    : "d-none")}`}
                  onClick={navigateToList}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-card-list"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                    <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                  </svg>
                </button>
                <button
                  className={`btn btn-secondary m-1 ${(user.role = "admin"
                    ? ""
                    : "d-none")}`}
                  onClick={handleGoUser}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                  </svg>
                </button>
                <button
                  className="btn btn-secondary m-1"
                  onClick={navigateToCart}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                  </svg>
                </button>
                <AdminIcon />
                <button className="btn btn-danger m-1" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>{" "}
              </div>
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

export default Cart;
