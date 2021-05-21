import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import TabBar from "../TabPanel/TabBar";
import Icons from "constants/Icons/Icons";
import style from "./Style";
import bgDefault from "assets/Images/bgDefault.png";
import { updateAvatar, updateBackground } from "redux/user";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "components/shared/Loading/Loading";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProfileInfo = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [tempPhoto, setTempPhoto] = useState({
    avatar: "",
    background: bgDefault,
  });
  const [photo, setPhoto] = useState({
    type: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  let userState = useSelector((state) => state.user.currentUser);
  let isUpdateAvatar = useSelector((state) => state.user.isUpdateAvatar);
  let isUpdateBackground = useSelector(
    (state) => state.user.isUpdateBackground
  );

  useEffect(() => {
    if (userState.background) {
      setTempPhoto({ ...tempPhoto, background: userState.background });
    }
  }, [userState]);
  useEffect(() => {
    if (isUpdateAvatar || isUpdateBackground) {
      setIsLoading(false);
      setPhoto({ type: "", url: "" });
    }
  }, [isUpdateAvatar, isUpdateBackground]);

  const updatePhoto = (e) => {
    let photo = e.target.files[0];
    let { name } = e.target;
    setPhoto({
      type: name,
      url: photo,
    });
    setTempPhoto({ [name]: URL.createObjectURL(photo) });
  };

  const confirmClose = () => {
    setTempPhoto({ avatar: "", background: "" });
    setPhoto({ type: "", url: "" });
  };
  const confirmDone = () => {
    setIsLoading(true);
    if (photo.type === "avatar") {
      dispatch(updateAvatar(photo.url));
    }
    if (photo.type === "background") {
      dispatch(updateBackground(photo.url));
    }
  };

  return (
    <Grid item={true} sm={12} md={12} style={{ padding: "0 40px" }}>
      <Grid item={true} md={12} className={classes.backgroundWrapper}>
        <Grid
          item={true}
          md={12}
          sm={12}
          className={classes.backgroundCover}
          style={{
            backgroundImage: `url(${tempPhoto.background})`,
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          {photo.type === "background" && (
            <Box
              display="flex"
              justifyContent="center"
              className={classes.confirmBackground}
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <button
                    className={classes.backgroundCancel}
                    onClick={confirmClose}
                  >
                    <Icons.CloseIcon className={classes.confirmIcon} />
                  </button>
                  <button
                    className={classes.backgroundSave}
                    onClick={confirmDone}
                  >
                    <Icons.DoneIcon className={classes.confirmIcon} />
                  </button>
                </>
              )}
            </Box>
          )}
          <label htmlFor="update-bg">
            <span className={classes.updateBgCover}>Cập nhật ảnh bìa</span>
            <input
              onChange={updatePhoto}
              name="background"
              id="update-bg"
              type="file"
              style={{ display: "none" }}
            />
          </label>
        </Grid>
        <Box position="relative">
          <Avatar
            src={tempPhoto.avatar || userState.avatar}
            className={classes.avatar}
          >
            H
          </Avatar>
          {photo.type === "avatar" && (
            <Box
              display="flex"
              justifyContent="center"
              className={classes.confirmAvatar}
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <button
                    className={classes.avatarCancel}
                    onClick={confirmClose}
                  >
                    <Icons.CloseIcon className={classes.confirmIcon} />
                  </button>
                  <button className={classes.avatarSave} onClick={confirmDone}>
                    <Icons.DoneIcon className={classes.confirmIcon} />
                  </button>
                </>
              )}
            </Box>
          )}
          <label htmlFor="update-avatar">
            <Icons.CameraIcon className={classes.cameraIcon} />
            <input
              onChange={updatePhoto}
              name="avatar"
              id="update-avatar"
              type="file"
              style={{ display: "none" }}
            />
          </label>
        </Box>
      </Grid>
      <div className={classes.importantInfo}>
        <Typography className={classes.fullName}>
          {userState.fullname}
        </Typography>
        <Typography className={classes.username}>
          @{userState.username}
        </Typography>
      </div>
      <Grid container className={classes.userInfo}>
        <div>
          <Typography className={classes.department}>
            <strong>Khoa:</strong> {userState.department}
          </Typography>
          <Typography className={classes.industry}>
            <strong>Ngành:</strong> {userState.industry}
          </Typography>
          <Typography className={classes.course}>
            <strong>Khóa:</strong> {userState.course}
          </Typography>
          <Typography className={classes.class}>
            <strong>Lớp:</strong> {userState.class_room}
          </Typography>
          <Box display="flex">
            <Box display="flex" alignItems="center">
              <Icons.LocationIcon className={classes.infoIcon} />
              <Typography className={classes.joinAt}>
                Đến từ {userState.from}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" ml={1}>
              <Icons.DateIcon className={classes.infoIcon} />
              <Typography className={classes.joinAt}>Tham gia 1/20</Typography>
            </Box>
          </Box>
          <Grid container>
            <Typography className={classes.followState}>
              <strong>
                {userState.followers && userState.followers.length}
              </strong>{" "}
              Theo dõi -{" "}
              <strong>
                {userState.following && userState.following.length}
              </strong>{" "}
              đang theo dõi
            </Typography>
          </Grid>
        </div>
        <Button
          className={classes.btnUpdate}
          onClick={() => history.push("/update-profile/123")}
        >
          Cập nhật thông tin
        </Button>
      </Grid>
      <hr />
      <Grid container className={classes.timeline}>
        <TabBar />
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(ProfileInfo);
