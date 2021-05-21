import {
  Avatar,
  Badge,
  Box,
  Grid,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  withStyles,
} from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CreateGroup from "../GroupManage/CreateGroup";
import FindGroup from "../GroupManage/FindGroup";

import style from "./Style";

const UserList = (props) => {
  const { classes } = props;
  const [isCreate, setIsCreate] = useState(false);
  const [isFind, setIsFind] = useState(false);
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

  const search = (data) => {
    console.log(data);
  };
  const toggleForm = (type) => {
    if (type === "create") {
      setIsCreate(!isCreate);
      setIsFind(false);
    }
    if (type === "find") {
      setIsFind(!isFind);
      setIsCreate(false);
    }
  };

  const renderUserList = userList.map((u, i) => {
    return (
      <List className={classes.userList}>
        <ListItem className={classes.userItem}>
          <ListItemAvatar>
            <Badge
              color={u.isOnline ? "primary" : "secondary"}
              overlap="circle"
              variant="dot"
            >
              <Avatar src={u.avatar}>{u.name}</Avatar>
            </Badge>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography className={classes.userName}>{u.name}</Typography>
              </React.Fragment>
            }
            secondary={
              <React.Fragment>
                <Typography className={classes.userMessage}>
                  {u.message}
                </Typography>
              </React.Fragment>
            }
          />
          <Typography className={classes.messageTime}>10m</Typography>
        </ListItem>
      </List>
    );
  });
  return (
    <Grid item={true} md={3} sm={2} className={classes.listContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.listHeader}
      >
        {!isCreate & !isFind ? (
          <Typography className={classes.headerText}>
            Tin nhắn của bạn
          </Typography>
        ) : isCreate ? (
          <CreateGroup isCreate={isCreate} />
        ) : (
          <FindGroup isFind={isFind} />
        )}
        <Box display="flex" align="center">
          <Icons.AddMemberIcon
            className={classes.AddMemberIcon}
            onClick={() => toggleForm("find")}
          />
          <Icons.CreateIcon
            className={classes.createGroupIcon}
            onClick={() => toggleForm("create")}
          />
        </Box>
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
            />
          </form>
        </Box>
        <Box className={classes.showUserList}>{renderUserList}</Box>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(UserList);
