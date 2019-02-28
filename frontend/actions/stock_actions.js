import * as APIUtil from "../utils/stock_api_utils";

export const RECEIVE_STOCK = "RECEIVE_STOCK";

export const fetchStock = id => dispatch => {
  APIUtil.fetchStock(id).then(stock => dispatch(receiveStock(stock)));
}

export const receiveStock = stock => ({
  type: RECEIVE_STOCK,
  stock
});

