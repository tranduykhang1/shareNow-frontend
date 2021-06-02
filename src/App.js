import "./App.css";
//import io from "socket.io-client";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "router/PrivateRouter";

import React from "react";
import { Grid } from "@material-ui/core";

import routes from "./router/router";
import UploadPostModal from "components/shared/UploadPostModal/UploadPostModal";
import ConfirmUserForm from "components/shared/ConfirmUserForm/ConfirmUserForm";
import Notification from "components/shared/NoticeStatus/Notification";
//const socket = io("http://localhost:1234");

const App = () => {
  let { pathname } = window.location;
  let padding = 10;
  if (pathname === "/register") {
    padding = 0;
  }


  const containerStyle = {
    backgroundColor: "rgb(239 239 239 / 35%)",
    padding: padding,
    flexWrap: "nowrap",
    minHeight: "100%",
  };

  return (
    <Router>
      <Grid
        container
        item={true}
        sm={12}
        md={12}
        xs={12}
        style={containerStyle}
      >
      {/* <Notification /> */}
        <UploadPostModal />
        <ConfirmUserForm/>
        <Switch> {switchRoute(routes)} </Switch>
        {/* <NotificationContainer /> */}
      </Grid>
    </Router>
  );
};
const switchRoute = (routes) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <PrivateRoute
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        ></PrivateRoute>
      );
    });
  }
  return result;
};

export default App;
