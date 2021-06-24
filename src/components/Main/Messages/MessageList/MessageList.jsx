import {
  InputBase,
  Button,
  InputLabel,
  Avatar,
  Box,
  Grid,
  Typography,
  withStyles,
  Popover,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from "@material-ui/core";
import React, { useRef, useState, useEffect, createRef } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";
import lottie from "lottie-web";

import Icons from "constants/Icons/Icons";
import MessageItems from "../MessageItems/MessageItems";
import style from "./Style";
import animation from "assets/Animation/typing-animation.json";
import { useDispatch, useSelector } from "react-redux";
import images from "constants/Images/images";
import { sendMessageAction, sendMessageRoomAction } from "redux/message";

import io from "socket.io-client";

import constants from "constants/Const/socketIo";
import { getFollowingList } from "redux/user";
import { AvatarGroup } from "@material-ui/lab";
import { SettingsInputSvideoTwoTone } from "@material-ui/icons";
import MessageMembers from "./MessageMembers";
import InviteMembers from "./InviteMembers";
import Swal from "sweetalert2";

const socket = io(constants.ENDPOINT);

let array = [];
const MessageList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const messageEndRel = useRef(null),
    inputRef = useRef(null),
    typingRel = useRef(null),
    messageBodyRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState({ body: "", photo: "" });
  const [showAnimation, setShowAnimation] = useState(true);
  const [messageList, setMessageList] = useState();
  const [messageRoomList, setMessageRoomList] = useState();
  const [tempPhoto, setTempPhoto] = useState([]);
  const [messageSend, setMessageSend] = useState({
    id: "",
    full_name: "",
    avatar: "",
    message: "",
    photos: [],
    type: "",
  });
  const [openInvite, setOpenInvite] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [anchor, setAnchor] = useState();
  const [isSendPending, setIsSendPending] = useState(true);
  const [messageCount, setMessageCount] = useState(15);

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
  }, [showAnimation]);

  const onScroll = (e) => {
    if (messageBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageBodyRef.current;
      if (scrollTop === 0) {
        setMessageCount(messageCount + 15);
      }
    }
  };

  const userMessage = useSelector((state) => state.message.userMessage);
  const listMessageRoom = useSelector((state) => state.message.listMessageRoom);
  const isSent = useSelector((state) => state.message.isSent);
  const currentUser = useSelector((state) => state.user.currentUser);
  const roomMembers = useSelector((state) => state.message.roomMembers);
  const isTyping = useSelector((state) => state.message.isTyping);
  const isPending = useSelector((state) => state.message.sendPending);
  const isJoin = useSelector((state) => state.message.isJoin);

  const inputChange = (e) => {
    let { name, value } = e.target;
    if (name === "photos") {
      value = e.target.files;
      for (let i = 0; i < value.length; i++) {
        array.push(URL.createObjectURL(value[i]));
      }
    }
    setTempPhoto(array);
    setMessageSend({ ...messageSend, [name]: value });
  };

  const onEmojiClick = async (e, emojiObject) => {
    let { emoji } = emojiObject;
    let ref = inputRef.current;
    ref.focus();
    let start, end, msg;
    if (messageSend.message) {
      start = messageSend.message.substring(0, ref.selectionStart);
      end = messageSend.message.substring(ref.selectionStart);
      msg = start + emoji + end;
    } else {
      msg = emoji;
    }
    setMessageSend({ ...messageSend, message: msg });
  };

  useEffect(() => {
    setIsSendPending(!isSendPending);
    // if (isPending > 0) {
    //   socket.emit("SEND_MESSAGE", messageList.userInfo[0]._id);
    //   socket.emit("ROOM_MESSAGE", messageSend.roomId);
    // }
  }, [isPending]);

  useEffect(() => {
    if (currentUser) {
      setMessageSend({
        ...messageSend,
        id: currentUser._id,
        avatar: currentUser.avatar,
        full_name: currentUser.full_name,
      });
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(getFollowingList());
    if (userMessage[0]) {
      if (userMessage[0].room_code) {
        setMessageList(userMessage[0]);
        setMessageSend({
          ...messageSend,
          conversationId: "",
          roomId: userMessage[0]._id,
        });
      }
      if (!userMessage[0].room_code) {
        setMessageList(userMessage[0]);
        setMessageSend({
          ...messageSend,
          roomId: "",
          conversationId: userMessage[0]._id,
        });
      }
    }
  }, [userMessage]);

  // const scrollBottom = () => {
  //   messageEndRel.current.scrollIntoView({ behavior: "smooth" });
  //   setShowAnimation(false);
  // };

  // useEffect(() => {
  //     if (messageEndRel) {
  //       messageEndRel.current.addEventListener("DOMNodeInserted", (event) => {
  //         const { currentTarget: target } = event;
  //         target.scroll({ top: target.scrollHeight, behavior: "smooth" });
  //       });
  //   }
  // }, []);a

  const sendMessage = async (e) => {
    e.preventDefault();
    if (messageSend.message || messageSend.photos) {
      if (messageSend.conversationId) {
        dispatch(sendMessageAction(messageSend));
        socket.emit("SEND_MESSAGE", messageList.userInfo[0]._id);
      }
      if (messageSend.roomId) {
        dispatch(sendMessageRoomAction(messageSend));
        socket.emit("ROOM_MESSAGE", messageSend);
      }
      e.target.reset();
      setShowAnimation(false);
      setIsShow(false);
      setTempPhoto([]);
      setMessageSend({ ...messageSend, message: "", photos: [] });
    }
  };
  const toggleEmoji = () => {
    setIsShow(!isShow);
  };

  useEffect(() => {
    if (!isTyping) {
      setShowAnimation(isTyping);
    }
    if (
      messageList &&
      !messageList.room_code &&
      isTyping.userId === messageList.userInfo[0]._id
    ) {
      setShowAnimation(isTyping.status);
    }
  }, [isTyping]);

  const toggleTyping = (e) => {
    if (e.type === "focus") {
      if (!messageList.room_code) {
        socket.emit("TYPING", {
          receiver: messageList.userInfo[0]._id,
          sender: currentUser._id,
          status: true,
        });
        // setShowAnimation(false);
      }
    }
    if (e.type === "blur") {
      if (!messageList.room_code) {
        socket.emit("TYPING", {
          receiver: messageList.userInfo[0]._id,
          sender: currentUser._id,
          status: false,
        });
        // setShowAnimation(false);
      }
    }
  };

  //popover
  const onLeaveRoom = () => {
    setAnchor(null);

    Swal.fire({
      title: "Xác nhận",
      html: `Bạn có muốn rời phòng?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Rời",
      cancelButtonText: "Không",
    }).then((result) => {});
  };
  const onRemoveRoom = () => {
    setAnchor(null);

    Swal.fire({
      title: "Xác nhận",
      html: `Bạn có muốn xóa phòng này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Không",
    }).then((result) => {});
  };
  const onOpenInvite = () => {
    setOpenInvite(!openInvite);
    setAnchor(null);
  };
  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  ////////////////////////////////

  let renderMsg;
  if (messageList && messageList.message_list) {
    let length = messageList.message_list.length;
    let message;
    if (length > 20) {
      message = messageList.message_list.slice(length - messageCount, length);
    } else {
      message = messageList.message_list;
    }
    renderMsg = message.map((m, i) => {
      return <MessageItems key={i} msg={m} />;
    });
  }

  return (
    <Grid item={true} md={9} sm={11} className={classes.msgContainer}>
      {messageList && messageList.room_code && (
        <Grid container className={classes.msgHeader}>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.userAvatar}>
              {messageList && messageList.name.split("")[0]}
            </Avatar>
            <Box ml={1}>
              <Typography className={classes.userName}>
                {messageList && messageList.name}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" style={{ cursor: "pointer" }}>
            <AvatarGroup max={8}>
              {roomMembers &&
                roomMembers.map((member, index) => {
                  return (
                    <Avatar
                      alt="avatar"
                      src={member.users[0] && member.users[0].avatar}
                      key={index}
                    >
                      {member.users[0] &&
                        member.users[0].full_name.split("")[0]}
                    </Avatar>
                  );
                })}
            </AvatarGroup>
            <span
              style={{ color: "#2e6da4" }}
              onClick={() => setOpenMembers(!openMembers)}
            >
              Tất cả
            </span>
          </Box>

          <Box ml={3}>
            <Icons.MoreIcon className={classes.moreIcon} onClick={handleOpen} />
            <Popover
              open={Boolean(anchor)}
              anchorEl={anchor}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List>
                <ListItem
                  className={classes.popoverItem}
                  onClick={onOpenInvite}
                >
                  <Icons.AddMemberIcon className={classes.roomIcon} />
                  <ListItemText>Thêm</ListItemText>
                </ListItem>
                <ListItem className={classes.popoverItem} onClick={onLeaveRoom}>
                  <Icons.ExitIcon className={classes.roomIcon} />
                  <ListItemText>Rời phòng</ListItemText>
                </ListItem>
                {messageList && currentUser._id === messageList.admin_key && (
                  <ListItem
                    className={classes.popoverItem}
                    onClick={onRemoveRoom}
                  >
                    <Icons.TrashIcon className={classes.roomIcon} />
                    <ListItemText>Xóa phòng</ListItemText>
                  </ListItem>
                )}
              </List>
            </Popover>
          </Box>
        </Grid>
      )}
      {messageList && !messageList.room_code && (
        <Grid container className={classes.msgHeader}>
          <Box display="flex" alignItems="center">
            <Avatar
              src={messageList && messageList.userInfo[0].avatar}
              className={classes.userAvatar}
            >
              {messageList && messageList.userInfo[0].full_name.split("")[0]}
            </Avatar>
            <Box ml={1}>
              <Typography className={classes.userName}>
                {messageList && messageList.userInfo[0].full_name}
              </Typography>
              <Typography className={classes.userState}>
                {messageList && messageList.userInfo[0].state.online
                  ? "Đang trưc tuyến"
                  : "Không trực tuyến"}
              </Typography>
            </Box>
            {messageList &&
            !currentUser.following.includes(messageList.userInfo[0]._id) ? (
              <Button
                size="small"
                variant="outlined"
                color="secondary"
                className={classes.btnFollow}
              >
                Theo dõi
              </Button>
            ) : (
              ""
            )}
          </Box>
        </Grid>
      )}

      {!messageList ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          pt={5}
        >
          <h3>Welcome to shareNow</h3>
          <img src={images.logo} alt="" width={170} height={170} />
        </Box>
      ) : (
        <Grid
          className={classes.msgBody}
          onScroll={() => onScroll()}
          ref={messageBodyRef}
        >
          {renderMsg}

          <Box
            p={3}
            width="50%"
            m="auto"
            style={{ color: "grey", textAlign: "center" }}
          >
            {isSendPending ? (
              <div className={classes.sendingContainer}>
                <span className={classes.sendingText}>Đang gửi...</span>
              </div>
            ) : (
              ""
            )}
          </Box>
          {showAnimation && (
            <div className={classes.typing} ref={typingRel}></div>
          )}

          {isShow && <Picker onEmojiClick={onEmojiClick} />}
          <Grid item={true} className={classes.msgFooter}>
            <form onSubmit={sendMessage} className={classes.msgForm}>
              <Grid container className={classes.attachIcon}>
                <InputLabel htmlFor="photo" style={{ margin: 0 }}>
                  <Icons.ImgIcon className={classes.photoIcon} />
                </InputLabel>
                <Icons.MoodIcon
                  className={classes.emojiIcon}
                  onClick={toggleEmoji}
                />
              </Grid>
              <input
                name="photos"
                id="photo"
                type="file"
                style={{ display: "none" }}
                onChange={inputChange}
                multiple
              />
              <input
                name="message"
                type="text"
                value={messageSend.message || ""}
                placeholder="Nhập tin nhắn..."
                autoComplete="off"
                className={classes.msgInput}
                onBlur={toggleTyping}
                onFocus={toggleTyping}
                onChange={inputChange}
                ref={inputRef}
              />
              <Button className={classes.btnSendMsg}>
                <Icons.SendIcon className={classes.sendMsgIcon} />
              </Button>
            </form>
            <Box display="flex" align="center">
              {tempPhoto.map((photo, index) => {
                return (
                  <Box
                    m={1}
                    key={index}
                    style={{ boxShadow: "0px 0px 3px 2px #c7c7c7" }}
                  >
                    <img src={photo} alt="Ảnh" height="70" width="70" />
                  </Box>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      )}
      {messageSend.roomId && (
        <>
          <MessageMembers open={openMembers} />
          <InviteMembers open={openInvite} />
        </>
      )}
    </Grid>
  );
};

export default withStyles(style)(MessageList);
