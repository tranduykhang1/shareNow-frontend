import {
  Avatar,
  Button,
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { Link } from "react-router-dom";
import { getRelatedUser } from "redux/user";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const RightSide = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [userList, setUserList] = useState([]);

  let currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getRelatedUser());
      resp = unwrapResult(resp);
      setUserList(resp);
    };

    fetchData();
  }, []);

  const search = (data) => {};

  const renderListUser = userList.map((u, i) => {
    if (currentUser._id !== u._id) {
      return (
        <Link to={`/profile/${u._id}`} key={i}>
          <List className={classes.userList}>
            <ListItem alignItems="flex-start" className={classes.userItem}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={u.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.userName}
                    >
                      {u.full_name}
                    </Typography>
                  </React.Fragment>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body1"
                      className={classes.userIndustry}
                      color="textPrimary"
                    >
                      {u.class_room} - Khóa {u.course}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Button variant="outlined" className={classes.btnFollow}>
                Xem
              </Button>
            </ListItem>
          </List>
        </Link>
      );
    }
  });
  return (
    <Hidden smDown>
      <Grid item={true} md={3} sm={3} className={classes.rightContainer}>
        <Grid
          container
          item={true}
          md={10}
          sm={10}
          className={classes.searchContainer}
        >
          {/* <form onSubmit={handleSubmit(search)} className={classes.searchForm}>
            <Icons.SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Tìm kiếm..."
              className={classes.searchInput}
            />
          </form> */}
        </Grid>
        <Grid item={true} md={10} sm={10} className={classes.usersRecommend}>
          <Typography style={{ fontWeight: "bold" }}>Gợi ý cho bạn</Typography>
          {renderListUser}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default withStyles(style)(RightSide);
