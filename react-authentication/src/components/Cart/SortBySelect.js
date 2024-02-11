import React from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";

const SortBySelect = ({ value, onChange }) => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="mb-3 d-flex">
      <div className="me-2 pe-2 border border-start-0 border-top-0 border-bottom-0">
        <label>Remove All</label>
        <br />
        <button
          className="btn btn-danger"
          style={{ height: "38px" }}
          onClick={handleClearCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </button>
      </div>
      <div>
        <label>Sort By</label>
        <select className="form-control" value={value} onChange={onChange}>
          <option value="default">Default</option>
          <option value="name">Name</option>
          <option value="brandName">Brand Name</option>
          <option value="price">Price</option>
          <option value="color">Color</option>
        </select>
      </div>
    </div>
  );
};

export default SortBySelect;
