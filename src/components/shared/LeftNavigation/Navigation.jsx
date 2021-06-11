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
  Divider,
} from "@material-ui/core";
import { Link, NavLink, useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icons from "constants/Icons/Icons";
import imgConstant from "constants/Images/images";

import style from "./Style";
//action
import { getUser } from "redux/user";
import { toggleUploadForm } from "redux/toggleComponent";

const Navigation = (props) => {
  const { classes } = props;
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const userState = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const toggle = () => {
    dispatch(toggleUploadForm(true));
  };

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    history.push('/login')
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
            <Box className={classes.navFooter}>
              {expand && (
                <Box className={classes.expand}>
                  <Box p={1}>
                    <b>{userState.full_name}</b>
                  </Box>
                  <Divider />
                  <Box pt={2} pb={2} display="flex" alignItems="center">
                  <Icons.ProfileIcon className={classes.expandIcon}/>
                    <Link to={`/profile/${userState._id}`} >
                      <p className={classes.toProfile}>Trang cá nhân</p>
                    </Link>
                  </Box>
                  <Box pb={2} display="flex"  alignItems="center">
                    <Icons.ExitIcon className={classes.expandIcon}/>
                    <p onClick={logout} className={classes.toLogout}>Đăng xuất</p>
                  </Box>
                </Box>
              )}
              <Box
                display="flex"
                alignItems="center"
                className={classes.avatarBox}
                onClick={() => setExpand(!expand)}
                aria-describedby="popover"
              >
                <Avatar src={userState.avatar} className={classes.userAvatar}>
                  {userState && userState.full_name.split("")[0]}
                </Avatar>
                <Icons.DownIcon className={classes.moreIcon} />
              </Box>
              {/* <Typography color="textSecondary">
                @{userState.username}
              </Typography> */}
            </Box>
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
              <Box className={classes.navFooter}>
                <Avatar src={userState.avatar} className={classes.userAvatar}>
                  {userState && userState.full_name.split("")[0]}
                </Avatar>
                <Typography color="textSecondary">
                  @{userState.username}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default withStyles(style)(Navigation);
