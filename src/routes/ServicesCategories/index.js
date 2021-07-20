import React from "react";
import List from "./list";
// import Add from "./Add";
// import Edit from "./Edit";
import { Route, Switch } from "react-router-dom";

function Index() {
  const url = "services_categories"
  return (
    <div>
      <Switch>
        <Route exact path={`/${url}`} component={List} />
        {/* <Route exact path={`/usuarios/adicionar`} component={Add} /> */}
        {/* <Route exact path={`/usuarios/editar/:id`} component={Edit} /> */}
      </Switch>
    </div>
  );
}

export default Index;
