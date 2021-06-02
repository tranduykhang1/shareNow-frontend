import { Grid, withStyles } from "@material-ui/core";
import {} from "@material-ui/core";
import PostList from "components/shared/Post/PostList/PostList";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import TagList from "components/shared/TagList/TagList";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UploadCard from "../UploadForm/UploadCard";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
};

const HomePage = (props) => {
  const [success, setSuccess] = useState(false);

  let isActive = useSelector((state) => state.user.isActive);
  useEffect(() => {
    if (isActive) {
      setSuccess(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 1650);
  }, [isActive]);

  return (
    <Grid item sm={12} md={6} style={style}>
      {success && <SuccessAnimation />}
      <UploadCard />
      <TagList />
      <PostList />
    </Grid>
  );
};

export default withStyles(style)(HomePage);
