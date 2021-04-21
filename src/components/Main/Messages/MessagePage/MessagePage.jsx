import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import React from "react";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";

const style = {
  height: 740,
  marginLeft: "auto",
  borderRadius: 10,
  boxShadow: "1px 1px 5px 1px #e4e4e4",
  backgroundColor: 'white'
};
const MessagePage = () => {
  return (
    <Grid container item sm={12} md={9} style={style}>
      <UserList />
      <MessageList />
    </Grid>
  );
};

export default MessagePage;
