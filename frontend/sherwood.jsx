import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from './components/root';
import {makeTransaction} from "./actions/stock_actions";


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
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.makeTransaction = makeTransaction;
  ReactDOM.render(<Root store={store} />, root)
})