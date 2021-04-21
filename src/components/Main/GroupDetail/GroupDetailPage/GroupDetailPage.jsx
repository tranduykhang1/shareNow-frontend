import { Grid, withStyles } from "@material-ui/core";
import PostList from "components/shared/Post/PostList/PostList";
import React from "react";
import GroupDetailHeader from "../GroupDetailHeader/GroupDetailHeader";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
};

const GroupDetailPage = (props) => {
  return (
    <Grid item sm={12} md={6} style={style}>
      <GroupDetailHeader />
      <PostList />
    </Grid>
  );
};

export default GroupDetailPage;
