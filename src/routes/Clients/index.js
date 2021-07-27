import React from "react";
import List from "./list";
import Add from "./add";
// import Edit from "./Edit";
import { Route, Switch } from "react-router-dom";

function Index() {
  const url = "clients";
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
        {/* <Route exact path={`/usuarios/editar/:id`} component={Edit} /> */}
      </Switch>
    </div>
  );
}

export default Index;
