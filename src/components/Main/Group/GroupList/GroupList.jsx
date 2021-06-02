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
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { groupByUser } from "redux/group";

const GroupList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  let userGroups = useSelector((state) => state.group.userGroups);

  useEffect(() => {
    dispatch(groupByUser());
  }, []);
  const search = (data) => {};

  console.log(userGroups);
  let renderListUser = "";
  if (userGroups) {
    renderListUser = userGroups.map((group, i) => {
      return (
        <a href={`/group/${group._id}`} key={i}>
          <List className={classes.groupList}>
            <ListItem alignItems="flex-start" className={classes.groupItem}>
              <ListItemAvatar>
                <Avatar
                  alt="Group background"
                  src={group.background}
                  style={{ border: "1px solid grey", color: "grey" }}
                >
                  Group
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.groupName}
                    >
                      {group.name}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </a>
      );
    });
  }

  return (
    <Hidden smDown>
      <Grid item={true} md={3} sm={false} className={classes.rightContainer}>
        <Grid
          container
          item={true}
          md={10}
          sm={10}
          className={classes.searchContainer}
        >
          <form onSubmit={handleSubmit(search)} className={classes.searchForm}>
            <Icons.SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Tìm kiếm..."
              className={classes.searchInput}
            />
          </form>
        </Grid>
        <Grid item={true} md={10} sm={10} className={classes.usersRecommend}>
          <Typography style={{ fontWeight: "bold" }}>
            Nhóm đang tham gia
          </Typography>
          {renderListUser}
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default withStyles(style)(GroupList);
