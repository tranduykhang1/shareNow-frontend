import { Grid } from "@material-ui/core";
import React from "react";

import ProfileInfo from "../ProfileInfo/ProfileInfo";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
  // boxShadow: "1px 1px 5px 1px #e4e4e4",
  // backgroundColor: "white",
};
const ProfilePage = () => {
  return (
    <Grid container item sm={12} md={6} style={style}>
      <ProfileInfo/>
    </Grid>
  );
};

export default ProfilePage;
