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
import React from "react";
import { useForm } from "react-hook-form";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { Link } from "react-router-dom";

const RightSide = (props) => {
  const { classes } = props;
  const { register, handleSubmit } = useForm();
  const listUser = [
    {
      name: "Joshua Rodriquez",
      industry: "KTPM",
      avatar: "https://picsum.photos/200/300?random=2",
    },
    {
      name: "Joshua Rodriquez",
      industry: "KTPM",
      avatar: "https://picsum.photos/200/300?random=2",
    },
    {
      name: "Joshua Rodriquez",
      industry: "KTPM",
      avatar: "https://picsum.photos/200/300?random=2",
    },
    {
      name: "Joshua Rodriquez",
      industry: "KTPM",
      avatar: "https://picsum.photos/200/300?random=2",
    },
  ];

  const search = (data) => {};

  const renderListUser = listUser.map((u, i) => {
    return (
      <Link to="/" key={i}>
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
                    {u.name}
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
                    {u.industry}
                  </Typography>
                </React.Fragment>
              }
            />
            <Button variant="contained" className={classes.btnFollow}>
              Theo dõi
            </Button>
          </ListItem>
        </List>
      </Link>
    );
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
