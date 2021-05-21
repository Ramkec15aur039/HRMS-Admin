/** **************************** Import Libs ****************************** */
import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "core-js";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/** **************************** Import Icons ****************************** */
import { icons } from "./assets/icons";

/** **************************** Import store ****************************** */
import store from "./redux/store";

React.icons = icons;

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById("root"),
);

serviceWorker.unregister();
