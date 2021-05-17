import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  withStyles,
  Button,
  Hidden,
} from "@material-ui/core";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icons from "constants/Icons/Icons";
import imgConstant from "constants/Images/images";
import token  from "assets/Config/jwtChecker";

import style from "./Style";
//action
import {getUser} from "redux/user"


const Navigation = (props) => {
  const { classes } = props;
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory()

  const userState = useSelector(state => state.user.response)

  console.log(userState)
 
  useEffect(() =>{
    dispatch(getUser())
  }, [])

  const toggleModal = () =>{
    // dispatch(toggleModal())
  }


  const navItems = [
    {
      icon: Icons.Home,
      text: "Trang chủ",
      link: "/",
    },
    {
      icon: Icons.ChatBubble,
      text: "Tin nhắn",
      link: "/message",
    },
    {
      icon: Icons.Group,
      text: "Nhóm",
      link: "/groups",
    },
    {
      icon: Icons.Notification,
      text: "Thông báo",
      link: "/notification",
    },
    {
      icon: Icons.Person,
      text: "Trang cá nhân",
      link: "/profile/:id",
    },
  ];

  const renderItems = navItems.map((item, index) => {
    return (
      <NavLink
        to={item.link}
        key={index}
        activeClassName={classes.linkActive}
        className={classes.navLink}
        exact
      >
        <ListItem className={classes.navItem}>
          <ListItemAvatar>
            <Avatar className={classes.navIcon}>
              <item.icon
                className={
                  item.link === url ? classes.iconActive : classes.navIcon
                }
              />
            </Avatar>
          </ListItemAvatar>
          <Typography className={classes.navTitle}>{item.text}</Typography>
        </ListItem>
      </NavLink>
    );
  });

  return (
    <Hidden smDown>
      <Grid item={true} md={3} sm={false} className={classes.navContainer}>
        <Box>
          <Link to="/">
            <img src={imgConstant.logo} className={classes.logo} />
          </Link>
        </Box>
        <Grid container direction="column" alignItems="center">
          <List>{renderItems}</List>
          <Button variant="contained" className={classes.btnShare} onClick={toggleModal}>
            Hãy chia sẻ gì đó!
          </Button>
        </Grid>
        <Grid className={classes.navFooter}>
          <Typography color="textSecondary">{userState.username}</Typography>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default withStyles(style)(Navigation);
