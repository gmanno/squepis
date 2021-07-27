import React from "react";
import List from "./list";
import Add from "./add";
import Edit from "./edit";
import { Route, Switch } from "react-router-dom";

function Index() {
  const url = "service_categories";
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`/${url}`}
          render={(props) => <List {...props} url={url} />}
        />
        <Route
          exact
          path={`/${url}/add`}
          render={(props) => <Add {...props} url={url} />}
        />
        <Route
          exact
          path={`/${url}/edit/:id`}
          render={(props) => <Edit {...props} url={url} />}
        />
      </Switch>
    </div>
  );
}

export default Index;
