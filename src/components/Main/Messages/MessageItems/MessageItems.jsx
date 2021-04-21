import {
  Avatar,
  Tooltip,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";

import style from "./Style";
import Icons from "constants/Icons/Icons";
const MessageItems = (props) => {
  const { classes } = props;

  const { msg } = props;

  return (
    <Grid
      container
      alignItems="start"
      className={msg.user ? classes.msgItemMe : classes.msgItemOther}
    >
      <Avatar
        src="https://picsum.photos/200/300?random=1"
        className={classes.msgAvatar}
      ></Avatar>
      <Grid
        item={true}
        sm={12}
        className={msg.user ? classes.msgBodyMe : classes.msgBodyOther}
      >
        <Typography>{msg.msg}</Typography>
        <Typography className={classes.msgTime}>10:30</Typography>
      </Grid>

      {msg.user && (
        <Tooltip title="Remove" arrow >
          <Icons.TrashIcon className={classes.trashIcon} />
        </Tooltip>
      )}
    </Grid>
  );
};

export default withStyles(style)(MessageItems);
