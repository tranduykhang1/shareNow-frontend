import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import React, { useEffect } from "react";
import Message from "./MessagePage/MessagePage";

import io from "socket.io-client";
import token from "assets/Config/jwtChecker";
import constants from "constants/Const/socketIo";
import { useDispatch } from "react-redux";
import { isTyping } from "redux/message";

const socket = io("http://localhost:1234");


const Socket = () => {
  const dispatch = useDispatch();

  useEffect(() =>{
    socket.on("TYPING", data => dispatch(isTyping(data)))
  }, [socket])

  return (
    <>
      <Navigation />
      <Message />
    </>
  );
};

export default Socket;
