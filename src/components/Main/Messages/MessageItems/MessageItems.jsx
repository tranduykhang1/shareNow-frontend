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
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "redux/message";

const MessageItems = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const messageRef = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  // const roomMembers = useSelector((state) => state.user.roomMembers);
  const isGroup = useSelector((state) => state.toggle.isGroup);

  const { msg } = props;

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const onDeleteMessage = () => {
    dispatch(deleteMessage(msg.message_id));
  };

  return msg.is_deleted ? (
    <Grid
      container
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
          {isGroup && currentUser._id !== msg.sent_by.id ? (
            <h6 className={classes.msgName}>{msg.sent_by.full_name}</h6>
          ) : (
            ""
          )}

          <i style={{ color: "grey" }}>Tin nhắn đã xóa</i>
          <Typography className={classes.msgTime}>
            <Moment date={msg.sent_at} format="hh:mm" trim />
          </Typography>
        </Grid>
      </Box>
    </Grid>
  ) : (
    <Grid
      container
      // alignItems="start"
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
        {msg.photos.length ? (
          <FbImageLibrary
            images={msg.photos}
            width={300}
            maxWidth={400}
            style={{ width: 300 }}
          />
        ) : (
          ""
        )}
        {msg.message_body && (
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
              {isGroup && currentUser._id !== msg.sent_by.id ? (
                <h6 className={classes.msgName}>{msg.sent_by.full_name}</h6>
              ) : (
                ""
              )}

              <Typography>{msg.message_body}</Typography>
              <Typography className={classes.msgTime}>
                {" "}
                <Moment date={msg.sent_at} format="hh:mm" trim />
              </Typography>
            </Grid>

            {msg.sent_by.id === currentUser._id && (
              <Tooltip title="Remove" arrow>
                <Icons.TrashIcon
                  className={classes.trashIcon}
                  onClick={onDeleteMessage}
                />
              </Tooltip>
            )}
          </Box>
        )}
      </Box>
    </Grid>
  );
};

export default withStyles(style)(MessageItems);
