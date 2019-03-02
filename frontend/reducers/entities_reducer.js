import {combineReducers} from "redux";
import UsersReducer from "./users_reducer";
import CurrentStockReducer from "./current_stock_reducer";

export default combineReducers({
  users: UsersReducer,
  current_stock: CurrentStockReducer
})