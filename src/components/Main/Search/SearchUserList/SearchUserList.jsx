import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser, toggleFollowUser } from "redux/user";

import style from "./Style";

const SearchUserList = (props) => {
  const { classes, users } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  let isFollow = useSelector((state) => state.user.isFollow);

  useEffect(() => {
    dispatch(getUser());
  }, [isFollow]);

  const followUser = async (user_id) => {
    await dispatch(toggleFollowUser(user_id));
  };

  let renderList = users.map((user, index) => {
    return (
      <ListItem className={classes.userItemNested}>
        <Link
          to={`/profile/${user._id}`}
          className={classes.userItem}
          key={index}
        >
          <ListItemAvatar>
            <Avatar className={classes.avatar} src={user.avatar}>
              {user.full_name.split("")[0]}
            </Avatar>
          </ListItemAvatar>
        </Link>
        <Box className={classes.userInfo} ml={1}>
          <Box>
            <b>{user.full_name}</b>
            <h6>
              {user.class_room} - Khóa: {user.course}
            </h6>
          </Box>
          {currentUser && currentUser._id === user._id ? (
            "Bạn"
          ) : !currentUser.following.includes(user._id) ? (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              className={classes.btnFollow}
              onClick={() => followUser(user._id)}
            >
              Theo dõi
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              className={classes.btnFollow}
              onClick={() => followUser(user._id)}
            >
              Bỏ theo dõi
            </Button>
          )}
        </Box>
      </ListItem>
    );
  });

  return <List className={classes.userList}>{renderList}</List>;
};

export default withStyles(style)(SearchUserList);
