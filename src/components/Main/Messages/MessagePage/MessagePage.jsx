import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import React, { useEffect } from "react";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";

import io from "socket.io-client";
import token from "assets/Config/jwtChecker";
import constants from "constants/Const/socketIo";
import { isTyping, isSentSocket, isSentRoomSocket } from "redux/message";
import { useDispatch, useSelector } from "react-redux";

const style = {
  height: "97vh",
  marginLeft: "auto",
  borderRadius: 10,
  boxShadow: "1px 1px 5px 1px #e4e4e4",
  backgroundColor: "#fdfdfd",
};

const socket = io(constants.ENDPOINT);

const MessagePage = () => {
  // const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Grid
      container
      item
      sm={12}
      md={9}
      style={style}
      className="messageResponsive"
    >
      <UserList />
      <MessageList />
    </Grid>
  );
};

export default MessagePage;
