import ReactDOM from "react-dom";
import React from "react";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<h1>Hello World</h1>, root)
})