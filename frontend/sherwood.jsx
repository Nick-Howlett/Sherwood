import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from './components/root';
import {watchStock, removeWatch} from './actions/stock_actions';



document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if(window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.user.id]: window.currentUser.user },
        transactions: window.currentUser.transactions,
        watchedStocks: window.currentUser.watchlist
      },
      session: { id: window.currentUser.user.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else{
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.watchStock = watchStock;
  window.removeWatch = removeWatch;
  ReactDOM.render(<Root store={store} />, root)
})