import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";
import "antd/dist/antd.less";
import firebase from "./config";
import App from "./App";
import { reduxFirestore, getFirestore } from "redux-firestore";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk.withExtraArgument({ getFirestore })),
    reduxFirestore(firebase),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
