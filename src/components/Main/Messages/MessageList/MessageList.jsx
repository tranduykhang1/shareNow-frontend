import {
  InputBase,
  Button,
  InputLabel,
  Avatar,
  Box,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";
import lottie from "lottie-web";

import Icons from "constants/Icons/Icons";
import MessageItems from "../MessageItems/MessageItems";
import style from "./Style";
import animation from "assets/Animation/typing-animation.json";

const MessageList = (props) => {
  const { classes } = props;
  const messageEndRel = useRef(null),
    typingRel = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState({ body: "", photo: "" });
  const [showAnimation, setShowAnimation] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (typingRel) {
      lottie.loadAnimation({
        container: typingRel.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animation,
      });
    }
  });

  const scrollBottom = () => {
    messageEndRel.current.scrollIntoView({ behavior: "smooth" });
    setShowAnimation(false);
  };

  const sendMessage = async (data, e) => {
    if (data.message.length > 0) {
      setMessage({ body: data.message, photo: data.photo });
      e.target.reset();
      scrollBottom();

      setMessage({ body: "", photo: "" });
    }
  };
  const toggleEmoji = () => {
    setIsShow(!isShow);
  };

  const toggleTyping = (e) => {
    e.type && e.type === "focus"
      ? setShowAnimation(true)
      : setShowAnimation(false);
  };

  const msg = [
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: true,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: false,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: true,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: false,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: true,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: true,
    },
    {
      msg: "helloasdlf sjd asdf sdf ",
      user: true,
    },
  ];

  const renderMsg = msg.map((m, i) => {
    return <MessageItems key={i} msg={m} />;
  });
  return (
    <Grid item={true} md={9} sm={10} className={classes.msgContainer}>
      <Grid container className={classes.msgHeader}>
        <Box display="flex">
          <Avatar src="" className={classes.userAvatar}>
            H
          </Avatar>
          <Box ml={1}>
            <Typography className={classes.userName}>Username</Typography>
            <Typography className={classes.userState}>
              Đang trưc tuyến
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid className={classes.msgBody}>
        {renderMsg}
        {showAnimation && (
          <Grid className={classes.typing} ref={typingRel}></Grid>
        )}

        <Grid ref={messageEndRel} style={{ marginBottm: 20 }}></Grid>
      </Grid>

      <Grid item={true} className={classes.msgFooter}>
        {isShow && <Picker />}
        <form onSubmit={handleSubmit(sendMessage)} className={classes.msgForm}>
          <Grid container className={classes.attachIcon}>
            <InputLabel htmlFor="photo" style={{ margin: 0 }}>
              <Icons.ImgIcon className={classes.photoIcon} />
            </InputLabel>
            <Icons.MoodIcon
              className={classes.emojiIcon}
              onClick={toggleEmoji}
            />
          </Grid>
          <InputBase
            name="photo"
            id="photo"
            type="file"
            inputRef={register}
            style={{ display: "none" }}
          />
          <InputBase
            fullWidth
            name="message"
            type="text"
            placeholder="Message..."
            autoComplete="off"
            inputRef={register}
            className={classes.msgInput}
            onBlur={toggleTyping}
            onFocus={toggleTyping}
          />
          <Button className={classes.btnSendMsg}>
            <Icons.SendIcon className={classes.sendMsgIcon} />
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(MessageList);
