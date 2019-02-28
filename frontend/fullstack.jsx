import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from './components/root';
import {fetchStock} from './actions/stock_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if(window.currentUser){
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else{
    store = configureStore();
  }
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchStock = fetchStock;
  ReactDOM.render(<Root store={store} />, root)
})