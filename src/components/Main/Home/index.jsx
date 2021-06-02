import { Grid } from "@material-ui/core";
import React from "react";

import Navigation from "components/shared/LeftNavigation/Navigation";
import HomePage from "./HomePage/HomePage";
import TopicList from "components/shared/TopicList/TopicList";
import Notification from "components/shared/NoticeStatus/Notification";

const index = () => {
  return (
    <Grid container item={true} sm={12} md={12} xs={12}>
      <Navigation />
      <HomePage />
      <TopicList />
    </Grid>
  );
};

export default index;
