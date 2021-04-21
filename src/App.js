import React from "react";
import "./App.css";
//import io from "socket.io-client";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import routes from "./router/router";

import Navigation from "components/shared/LeftNavigation/Navigation";
import RightSide from "components/shared/RightSide/RightSide";
import { Grid } from "@material-ui/core";
import UploadPostModal from "components/shared/UploadPostModal/UploadPostModal";
//const socket = io("http://localhost:1234");

const App = () => {
  const switchRoute = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          ></Route>
        );
      });
    }
    return result;
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
        <UploadPostModal />
        <Switch> {switchRoute(routes)} </Switch>
        {/* <NotificationContainer /> */}
      </Grid>
    </Router>
  );
};

const containerStyle = {
  backgroundColor: "#dcdcdc59",
  padding: "10px",
  flexWrap: "nowrap",
  minHeight: "100%",
};

export default App;
