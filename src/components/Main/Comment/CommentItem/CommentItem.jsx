import { Avatar, Grid, Box, Typography, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import Moment from "react-moment";
import React from "react";
import { Link } from "react-router-dom";

import style from "./Style";
import { replyTo } from "redux/toggleComponent";
import { useDispatch } from "react-redux";

const CommentItem = (props) => {
  const { classes, data } = props;
  const dispatch = useDispatch();


  const reply = () => {
    dispatch(replyTo(data))
  };

  return (
    <Grid className={classes.commentItem}>
      <Grid container className={classes.commentHeader}>
        <Link to="">
          <Avatar
            className={classes.commentAvatar}
            src="http://res.cloudinary.com/dfniu86vr/image/upload/v1622863383/avatar/pibuqw0blzem9iul5bik.jpg"
          >
            H
          </Avatar>
        </Link>
        <Box className={classes.commentTextPane}>
          <Typography className={classes.commentUsername}>
            {data.comment_by.name}
          </Typography>
          <Typography className={classes.commentContent}>
            {data.content}
          </Typography>
          <Typography className={classes.commentAt}>
            <Moment fromNow>{data.create_at}</Moment>
          </Typography>
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
