import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import listReducer from "./slices/listSlice";
import cartReducer from "./slices/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  cart: cartReducer,
});

export default rootReducer;
