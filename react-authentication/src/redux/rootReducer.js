import { combineReducers } from "redux";
import authReducer from "./authSlice";
import listReducer from "./listSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
});

export default rootReducer;
