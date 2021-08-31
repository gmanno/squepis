import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}home`}
        component={asyncComponent(() => import("./Home"))}
      />
      <Route
        path={`${match.url}services`}
        component={asyncComponent(() => import("./Services"))}
      />
      <Route
        path={`${match.url}clients`}
        component={asyncComponent(() => import("./Clients"))}
      />
      <Route
        path={`${match.url}scheduling_status`}
        component={asyncComponent(() => import("./SchedulingStatus"))}
      />
      <Route
        path={`${match.url}vehicles_categories`}
        component={asyncComponent(() => import("./VehiclesCategories"))}
      />
    </Switch>
  </div>
);

export default App;
