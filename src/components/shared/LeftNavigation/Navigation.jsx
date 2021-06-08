import React, { useEffect, useState } from "react";
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
  Drawer,
  IconButton,
  Popover,
} from "@material-ui/core";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icons from "constants/Icons/Icons";
import imgConstant from "constants/Images/images";

import style from "./Style";
//action
import { getUser } from "redux/user";
import { toggleUploadForm } from "redux/toggleComponent";
import token from "assets/Config/jwtChecker";

import socketIOClient from "socket.io-client";
import constants from "constants/Const/socketIo";

const Navigation = (props) => {
  const { classes } = props;
  const { url, path } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const userState = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const socket = socketIOClient(constants.ENDPOINT);
    socket.emit("NEW_USER", token);

    dispatch(getUser());
  }, []);

  const toggle = () => {
    dispatch(toggleUploadForm(true));
  };

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      icon: Icons.Home,
      text: "Trang chủ",
      link: "/",
    },
    {
      icon: Icons.SearchIcon,
      text: "Tìm kiếm",
      link: "/search",
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
      link: `/profile/${userState._id}`,
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
    <nav>
      <Hidden mdUp>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <Icons.MenuIcon />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <Grid item={true} md={3} sm={false} className={classes.navContainer}>
          <Box>
            <Link to="/">
              <img src={imgConstant.logo} className={classes.logo} />
            </Link>
          </Box>
          <Grid container direction="column" alignItems="center">
            <List>{renderItems}</List>
            <Button
              variant="contained"
              className={classes.btnShare}
              onClick={toggle}
            >
              Hãy chia sẻ gì đó!
            </Button>
          </Grid>
          <Grid>
             <Link
              to={`/profile/` + userState._id}
              className={classes.navFooter}
            >
              <Avatar src={userState.avatar} className={classes.userAvatar}>
                {userState && userState.full_name.split("")[0]}
              </Avatar>
              <Typography color="textSecondary">
                @{userState.username}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Hidden>

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={isOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Grid item={true} md={3} sm={false}>
            <Box>
              <Link to="/">
                <img src={imgConstant.logo} className={classes.logo} />
              </Link>
            </Box>
            <Grid container direction="column" alignItems="center">
              <List>{renderItems}</List>
              <Button
                variant="contained"
                className={classes.btnShare}
                onClick={toggle}
              >
                Hãy chia sẻ gì đó!
              </Button>
            </Grid>
            <Grid>
              <Link
                to={`/profile/` + userState._id}
                className={classes.navFooter}
              >
                <Avatar src={userState.avatar} className={classes.userAvatar}>
                  {userState && userState.full_name.split("")[0]}
                </Avatar>
                <Typography color="textSecondary">
                  @{userState.username}
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default withStyles(style)(Navigation);
