import RootReducer from "../reducers/root_reducer";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';

export default (preloadedState = {}) => {
  let middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
  }
  return createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
};