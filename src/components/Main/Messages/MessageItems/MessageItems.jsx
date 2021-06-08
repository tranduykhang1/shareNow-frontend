import {
  Avatar,
  Tooltip,
  Grid,
  Typography,
  withStyles,
  Box,
} from "@material-ui/core";
import React, { useEffect, useRef } from "react";
import Moment from "react-moment";
import FbImageLibrary from "react-fb-image-grid";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { useSelector } from "react-redux";

const MessageItems = (props) => {
  const { classes } = props;

  const messageRef = useRef()
  const currentUser = useSelector((state) => state.user.currentUser);

  const { msg } = props;


  useEffect(() =>{
    messageRef.current.scrollIntoView({behavior: "smooth"})
  }, msg)

  return (
    <Grid
      container
      alignItems="start"
      className={
        msg.sent_by.id === currentUser._id
          ? classes.msgItemMe
          : classes.msgItemOther
      }
      ref={messageRef}
    >
      <Avatar src={msg.sent_by.avatar} className={classes.msgAvatar}>
        {msg.sent_by.full_name.split("")[0]}
      </Avatar>
      <Box display="flex" flexDirection="column">
        {msg.photos.length ?(
          <FbImageLibrary
            images={msg.photos}
            width={300}
            maxWidth={400}
            style={{ width: 300 }}
          />
        ) : ''}
        <Box display="flex" flexDirection="row-reverse">
          <Grid
            item={true}
            sm={12}
            className={
              msg.sent_by.id === currentUser._id
                ? classes.msgBodyMe
                : classes.msgBodyOther
            }
          >
            <Typography>{msg.message_body}</Typography>
            <Typography className={classes.msgTime}>
              {" "}
              <Moment date={msg.sent_at} format="hh:mm" trim />
            </Typography>
          </Grid>

          {msg.sent_by.id === currentUser._id && (
            <Tooltip title="Remove" arrow>
              <Icons.TrashIcon className={classes.trashIcon} />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default withStyles(style)(MessageItems);
