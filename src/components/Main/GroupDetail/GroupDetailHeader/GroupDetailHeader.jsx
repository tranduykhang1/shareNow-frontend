import React from "react";
import { Button, Grid, Typography, withStyles } from "@material-ui/core";

import style from "./Style";

const styles = {
  headerImage: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(https://plus24h.com/upload/images/fb-groups.jpg)`,
    backgroundSize: "cover",
    height: 200,
    width: "auto",
    borderRadius: 7,
  },
};

const GroupDetailHeader = (props) => {
  const { classes } = props;

  return (
    <Grid className={classes.headerContainer}>
      <div style={styles.headerImage}></div>
      <Grid container className={classes.groupInfo}>
        <div>
          <Typography className={classes.groupName}>Group name</Typography>
          <Typography className={classes.groupMember}>
            123 thành viên
          </Typography>
        </div>
        <Button variant="contained" className={classes.btnJoin}>Tham gia</Button>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(GroupDetailHeader);
