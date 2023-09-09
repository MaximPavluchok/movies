import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import http from "./http";
import { AuthUserActionType, IUser } from "./components/auth/types";
import jwtDecode from "jwt-decode";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

if (localStorage.token) {
  http.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.token}`;

  const user = jwtDecode(localStorage.token) as IUser;
  store.dispatch({
    type: AuthUserActionType.LOGIN_USER,
    payload: {
      email: user.email,
      image: user.image,
      roles: user.roles
    },
  });
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
