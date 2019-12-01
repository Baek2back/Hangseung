import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";
import "antd/dist/antd.less";
import App from "./App";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
