import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}sample`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      <Route
        path={`${match.url}service_categories`}
        component={asyncComponent(() => import("./ServiceCategories"))}
      />
      <Route
        path={`${match.url}clients`}
        component={asyncComponent(() => import("./Clients"))}
      />
    </Switch>
  </div>
);

export default App;
