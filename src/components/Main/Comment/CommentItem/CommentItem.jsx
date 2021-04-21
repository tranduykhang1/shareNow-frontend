import { Avatar, Grid, Box, Typography, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import React from "react";
import { Link } from "react-router-dom";

import style from "./Style";

const CommentItem = (props) => {
  const { classes } = props;

  const reply = () =>{
    props.reply(reply)
  }
  return (
    <Grid className={classes.commentItem}>
      <Grid container className={classes.commentHeader}>
        <Link to="">
          <Avatar className={classes.commentAvatar}>H</Avatar>
        </Link>
        <Box className={classes.commentTextPane}>
          <Typography className={classes.commentUsername}>Username</Typography>
          <Typography className={classes.commentContent}>
            Comment body
          </Typography>
          <Typography className={classes.commentAt}>10m ago</Typography>
        </Box>
      </Grid>
      <Grid className={classes.commentBody}>
        <div className={classes.reply} onClick={reply}>
          <Typography className={classes.replyTo}>Trả lời</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(CommentItem);
