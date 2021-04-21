import { Grid } from "@material-ui/core";
import React from "react";

import Navigation from "components/shared/LeftNavigation/Navigation";
import HomePage from "./HomePage/HomePage";
import RightSide from "components/shared/RightSide/RightSide";

const index = () => {
  return (
    <Grid container item={true} sm={12} md={12} xs={12}>
      <Navigation />
      <HomePage />
      <RightSide/>
    </Grid>
  );
};

export default index;
