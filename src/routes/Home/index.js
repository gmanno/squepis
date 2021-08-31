import React from "react";

import IntlMessages from "util/IntlMessages";

const Home = () => {
  return (
    <div>
      <h2 className="title gx-mb-4">
        <IntlMessages id="sidebar.dashboard" />
      </h2>

      <div className="gx-d-flex justify-content-center">
        <h4>Sistema SQUEPIS de controle de agendamentos</h4>
      </div>
    </div>
  );
};

export default Home;
