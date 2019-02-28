import * as APIUtil from "../utils/stock_api_utils";
import * as IEXApi from '../utils/iex_api_util';

export const RECEIVE_STOCK = "RECEIVE_STOCK";

export const fetchStock = symbol => dispatch => {
  APIUtil.fetchStock(symbol).then(stock => dispatch(receiveStock(stock)));
}

export const getStock = symbol => dispatch => {
  IEXApi.getStock(symbol).then(stock => dispatch(receiveStock(stock)));
}

export const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

