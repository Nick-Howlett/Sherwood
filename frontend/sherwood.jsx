import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";
import Root from './components/root';
import {getInfo, fetchStock, getNews, get1dChart} from "./actions/stock_actions";


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
  window.getInfo = getInfo;
  window.fetchStock = fetchStock;
  window.getNews = getNews;
  window.get1dChart = get1dChart;
  ReactDOM.render(<Root store={store} />, root)
})