import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from "./components/root";
import moment from "moment";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Testing entryfile running");

  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.user.id]: window.currentUser.user },
        transactions: window.currentUser.transactions,
        watchedStocks: window.currentUser.watchlist,
      },
      session: { id: window.currentUser.user.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
});
