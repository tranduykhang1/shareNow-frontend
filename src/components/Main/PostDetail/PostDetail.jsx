import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import PostItems from "components/shared/Post/PostItems/PostItems";
import RightSide from "components/shared/RightSide/RightSide";
import React from "react";
import { useRouteMatch } from "react-router";

const style = {
  container: {
    marginLeft: "21.5%",
    padding: "0 80px",
  },
};

const PostDetail = () => {
  const { path } = useRouteMatch();

  return (
    <Grid item={true} sm={12} md={12}>
      <Navigation />
      <Grid item sm={12} md={6} style={style.container}>
        <PostItems />
      </Grid>
      <RightSide />
    </Grid>
  );
};

export default PostDetail;
