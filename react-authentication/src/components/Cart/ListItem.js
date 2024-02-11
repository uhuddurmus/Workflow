import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const ListItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

  const handleCartAction = () => {
    if (isItemInCart) {
      // Eğer ürün sepette varsa, sepetten çıkar
      dispatch(removeFromCart(item));
    } else {
      // Eğer ürün sepette yoksa, sepete ekle
      dispatch(addToCart(item));
    }
  };

  return (
    <div
      key={item.id}
      className={`rounded col-md-3 m-1 ${
        isHovered ? "" : "bg-opacity-50"
      } bg-primary`}
      style={{
        minHeight: "30vh",
        cursor: "pointer",
        visibility:
          item.name.length < 1 && item.price < 1 ? "hidden" : "visible",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ position: "relative" }}>
        {/* Div içindeki içerikler */}
        <img src="./car.png" className="card-img-top" alt={item.name} />
        <strong>{item.name}</strong>
        <br />
        {item.brandName}, ${item.price}, {item.color}
        {/* Button */}
        <button
          className={`btn btn-secondary position-absolute top-0 end-0 m-2 me-0 ${
            isItemInCart ? "btn-danger" : ""
          }`}
          onClick={handleCartAction}
        >
          {!isItemInCart ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-cart ${isItemInCart ? "text-white" : ""}`}
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </>
          ) : (
            <>
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
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
