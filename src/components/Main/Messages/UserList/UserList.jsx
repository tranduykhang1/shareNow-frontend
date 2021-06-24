import {
  Avatar,
  Badge,
  Box,
  Grid,
  Hidden,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import Icons from "constants/Icons/Icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getConversations,
  getMessageRoomAction,
  getRoomMembers,
  getUserMessageAction,
  isSentRoomSocket,
  isSentSocket,
} from "redux/message";
import CreateGroup from "../GroupManage/CreateGroup";
import FindGroup from "../GroupManage/FindGroup";
import Moment from "react-moment";
import socketIOClient from "socket.io-client";
import constants from "constants/Const/socketIo";

import style from "./Style";
import { setIsGroup, setIsPost } from "redux/toggleComponent";

const socket = socketIOClient(constants.ENDPOINT);

const UserList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const [isFind, setIsFind] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState({ userId: "", conversationId: "" });
  const { register, handleSubmit } = useForm();

  const userList = [
    {
      avatar: "https://picsum.photos/200/300?random=1",
      name: "Jacob Maxwell",
      message: "ClwiYeuHFlFnPGdlwfSq",
      isOnline: true,
    },
    {
      avatar: "https://picsum.photos/200/300?random=2",
      name: "Jerome Coleman",
      message: "ClwiYeuHFlFnPGdlwfSq",
      isOnline: false,
    },
    {
      avatar: "https://picsum.photos/200/300?random=3",
      name: "Bettie Wolfel",
      message: "ClwiYeuHFlFnPGdlwfSq",
      isOnline: true,
    },
    {
      avatar: "https://picsum.photos/200/300?random=4",
      name: "Norman Figueroa",
      message: "ClwiYeuHFlFnPGdlwfSq",
      isOnline: false,
    },
  ];

  const isSent = useSelector((state) => state.message.isSent);
  const isSentRoom = useSelector((state) => state.message.isSentRoom);
  const isCreateRoom = useSelector((state) => state.message.isCreateRoom);
  const isPending = useSelector((state) => state.message.isPending);
  const isJoin = useSelector((state) => state.message.isJoin);

  useEffect(() => {
    dispatch(isSentSocket());
    dispatch(isSentRoomSocket());
  }, [isPending]);


  useEffect(() =>{
    setIsCreate(false)
  },[isCreateRoom])

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getConversations());
      resp = unwrapResult(resp);
      setConversations(resp);
    };

    fetchData();
  }, [isSent, isSentRoom, isCreateRoom]);

  useEffect(() => {
    if (isSent > 0) {
      getUserMessage(activeId.userId, activeId.conversationId);
    }
  }, [isSent]);

  useEffect(() => {
    if (isSentRoom > 0 || isJoin >0) {
      getRoomMessage(activeId.conversationId);
    }
  }, [isSentRoom, isJoin]);

  const search = (data) => {
    console.log(data);
  };
  const toggleForm = (type) => {
    setIsCreate(!isCreate);
  };

  const getUserMessage = (userId, conversationId) => {
    dispatch(setIsPost())
    dispatch(getUserMessageAction(userId));
    setActiveId({
      userId: userId,
      conversationId: conversationId,
    });
  };
  const getRoomMessage = (id) => {
    dispatch(setIsGroup())
    dispatch(getRoomMembers(id));
    dispatch(getMessageRoomAction(id));
    setActiveId({ ...activeId, conversationId: id });
  };

  const searchConversation = (e) =>{
    console.log(e.target.value)
  }

  let renderConversation;
  if (conversations) {
    renderConversation = conversations.map((conversation, i) => {
      let messageContent =
        conversation.message && conversation.message.message_body;
      if (conversation.message) {
        if (
          conversation.message.message_body &&
          conversation.message.message_body.length > 10
        ) {
          messageContent =
            conversation.message.message_body.slice(0, 10) + "...";
        }
      }
      if (conversation.name) {
        return (
          <List
            className={classes.userList}
            key={i}
            onClick={() => getRoomMessage(conversation._id)}
          >
            <ListItem
              className={
                activeId.conversationId === conversation._id
                  ? classes.userItemActive
                  : classes.userItem
              }
            >
              <ListItemAvatar>
                <Avatar src="" className={classes.userAvatar}>
                  {conversation.name.split("")[0]}
                </Avatar>
              </ListItemAvatar>
              <Hidden smDown>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography className={classes.userName}>
                        {conversation.name}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <span className={classes.userMessage}>
                        {conversation.message &&
                          messageContent}
                      </span>
                    </React.Fragment>
                  }
                />
                <Typography className={classes.messageTime}>
                  <Moment fromNow ago>
                    {conversation.message && conversation.message.sent_at}
                  </Moment>
                </Typography>
              </Hidden>
            </ListItem>
          </List>
        );
      }
      if (conversation.userFrom) {
        let userFrom;
        if (conversation.userFrom) {
          userFrom = conversation.userFrom[0];
        }
        return (
          <List
            className={classes.userList}
            key={i}
            onClick={() =>
              getUserMessage(conversation.userFrom[0]._id, conversation._id)
            }
          >
            <ListItem
              className={
                activeId.conversationId === conversation._id
                  ? classes.userItemActive
                  : classes.userItem
              }
            >
              <ListItemAvatar>
                <Badge
                  color={userFrom.state.online ? "primary" : "secondary"}
                  overlap="circle"
                  variant="dot"
                >
                  <Avatar
                    src={conversation.userFrom && userFrom.avatar}
                    className={classes.userAvatar}
                  >
                    {conversation.userFrom && userFrom.full_name.split("")[0]}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <Hidden smDown>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <span className={classes.userName}>
                        {conversation.userFrom && userFrom.full_name}
                      </span>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <span className={classes.userMessage}>
                        {conversation.message && messageContent}
                      </span>
                    </React.Fragment>
                  }
                />
                <Typography className={classes.messageTime}>
                  {" "}
                  <Moment fromNow ago>
                    {conversation.message && conversation.message.sent_at}
                  </Moment>
                </Typography>
              </Hidden>
            </ListItem>
          </List>
        );
      }
      if (conversation.userTo) {
        return (
          <List
            className={classes.userList}
            key={i}
            onClick={() =>
              getUserMessage(conversation.userTo[0]._id, conversation._id)
            }
          >
            <ListItem
              className={
                activeId.conversationId === conversation._id
                  ? classes.userItemActive
                  : classes.userItem
              }
            >
              <ListItemAvatar>
                <Badge
                  color={
                    conversation.userTo && conversation.userTo[0].state.online
                      ? "primary"
                      : "secondary"
                  }
                  overlap="circle"
                  variant="dot"
                >
                  <Avatar
                    className={classes.userAvatar}
                    src={conversation.userTo && conversation.userTo[0].avatar}
                  >
                    {conversation.userTo &&
                      conversation.userTo[0].full_name.split("")[0]}
                  </Avatar>
                </Badge>
              </ListItemAvatar>
              <Hidden smDown>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography className={classes.userName}>
                        {conversation.userTo &&
                          conversation.userTo[0].full_name}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <span className={classes.userMessage}>
                        {conversation.message && messageContent}
                      </span>
                    </React.Fragment>
                  }
                />
                <Typography className={classes.messageTime}>
                  {" "}
                  <Moment fromNow ago>
                    {conversation.message && conversation.message.sent_at}
                  </Moment>
                </Typography>
              </Hidden>
            </ListItem>
          </List>
        );
      }
    });
  }

  return (
    <Grid item={true} md={3} sm={1} className={classes.listContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.listHeader}
      >
        <Hidden smDown>
          {!isCreate ? (
            <Typography className={classes.headerText}>
              Tin nhắn của bạn
            </Typography>
          ) : (
            <CreateGroup isCreate={isCreate} />
          )}

          <Box display="flex" align="center">
            {/* <Icons.AddMemberIcon
              className={classes.AddMemberIcon}
              onClick={() => toggleForm()}
            /> */}
            <Icons.CreateIcon
              className={classes.createGroupIcon}
              onClick={() => toggleForm()}
            />
          </Box>
        </Hidden>
      </Box>
      <Grid className={classes.listBody}>
        <Box className={classes.searchBar}>
          <form onSubmit={handleSubmit(search)} className={classes.searchForm}>
            <Icons.SearchIcon className={classes.searchIcon} />
            <InputBase
              name="search"
              defaultValue=""
              inputRef={register}
              placeholder="Tìm kiếm..."
              className={classes.searchInput}
              onChange={searchConversation}
            />
          </form>
        </Box>
        <Box className={classes.showUserList}>{renderConversation}</Box>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(UserList);
