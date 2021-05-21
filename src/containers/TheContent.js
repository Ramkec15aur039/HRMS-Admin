/** ****************************** Import libs *********************************** */
import React, { Suspense } from "react";
import {
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

/** ****************************** Import routes *********************************** */
import routes from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const TheContent = () => (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={ loading }>
          <Switch>
            {routes.map((route, idx) => route.component && (
                <Route
                  key={ idx }
                  path={ route.path }
                  exact={ route.exact }
                  name={ route.name }
                  render={ (props) => (
                    <CFade>
                      <route.component { ...props } />
                    </CFade>
                  ) }
                />
            ))}
          </Switch>
          <Route path="/home">
              <Redirect to="/home/dashboard" />
            </Route>
        </Suspense>
      </CContainer>
    </main>
);

export default React.memo(TheContent);
