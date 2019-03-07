import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from './components/root';
import {getProfilePrevClose, getInfo} from './utils/stock_api_utils';
import {stockShares} from "./actions/selectors";
import moment from 'moment';
import tz from 'moment-timezone';



document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if(window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.user.id]: window.currentUser.user },
        transactions: window.currentUser.transactions
      },
      session: { id: window.currentUser.user.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else{
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root)
})