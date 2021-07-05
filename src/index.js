import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthData } from "./Store/AuthData";
import Reducer, { initialState } from "./Store/Reducer";

ReactDOM.render(
  <React.StrictMode>
    <AuthData initialState={initialState} reducer={Reducer}>
      <App />
    </AuthData>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
