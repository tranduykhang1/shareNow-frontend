import "./App.css";
//import io from "socket.io-client";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoute from "router/PrivateRouter";

import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";

import routes from "./router/router";
import UploadPostModal from "components/shared/UploadPostModal/UploadPostModal";
import ConfirmUserForm from "components/shared/ConfirmUserForm/ConfirmUserForm";
import Notification from "components/shared/NoticeStatus/Notification";
// import Socket from "components/Main/Messages/Socket"

import io from "socket.io-client";
import token from "assets/Config/jwtChecker";
import constants from "constants/Const/socketIo";
import { isTyping, isSentSocket, isSentRoomSocket } from "redux/message";
import { useDispatch, useSelector } from "react-redux";

const socket = io(constants.ENDPOINT);

const App = () => {
  const dispatch = useDispatch();

  const { pathname } = window.location;
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

  useEffect(() => {
    socket.emit("NEW_USER", token);
  }, []);

  useEffect(() => {
    socket.on("TYPING", (data) => {
      console.log(data);
      dispatch(isTyping(data));
    });
    socket.on("SEND_MESSAGE", () => {
      console.log("oke");
      dispatch(isSentSocket());
    });
    socket.on("ROOM_MESSAGE", (data) => {
      dispatch(isSentRoomSocket(data));
    });
  });

  ///
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
        <Notification />
        <UploadPostModal />
        <ConfirmUserForm />
        <Switch> {switchRoute(routes)} </Switch>{" "}
        {/* <NotificationContainer /> */} {/* <Socket/> */}{" "}
      </Grid>{" "}
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
