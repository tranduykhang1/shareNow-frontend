import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import ProfileInfo from "../ProfileInfo/ProfileInfo";

const ProfilePage = () => {
  let style = {
    marginLeft: "21.5%",
    padding: "0 40px",
  };

  return (
    <Grid container item sm={12} md={6} style={style} className="responsiveGrid">
      <ProfileInfo />
    </Grid>
  );
};

export default ProfilePage;
