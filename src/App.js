/** **************************** Import Packages ****************************** */
import React from "react";
import {
  BrowserRouter, Route, Switch,
} from "react-router-dom";
import "./scss/style.scss";
import "./App.css";
import { ToastContainer } from "react-toastify";

/** **************************** Import Container ****************************** */
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

/** **************************** Import Pages ****************************** */
const Login = React.lazy(() => import("./pages/login/Login"));

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

class App extends React.PureComponent {
  render() {
    return (
      <>
      <BrowserRouter>
        <React.Suspense fallback={ loading }>
          <Switch>
            <Route
              exact
              path="/"
              name="Login Page"
              render={ (props) => <Login { ...props } /> }
            />
            <Route
              path="/home"
              name="Home"
              render={ (props) => <TheLayout { ...props } /> }
            />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
      <ToastContainer limit={ 1 } autoClose={ 3000 } />
      </>
    );
  }
}

export default App;
