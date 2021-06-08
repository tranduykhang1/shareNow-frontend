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
import { useHistory, useParams } from "react-router";
import Moment from "react-moment";

import TabBar from "../TabPanel/TabBar";
import Icons from "constants/Icons/Icons";
import style from "./Style";
import bgDefault from "assets/Images/bgDefault.png";
import {
  getUser,
  getUserProfile,
  toggleFollowUser,
  updateAvatar,
  updateBackground,
} from "redux/user";
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
  const { id } = useParams();

  const [tempPhoto, setTempPhoto] = useState({
    avatar: "",
    background: bgDefault,
  });
  const [photo, setPhoto] = useState({
    type: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const history = useHistory();

  let currentUser = useSelector((state) => state.user.currentUser);
  let isUpdateAvatar = useSelector((state) => state.user.isUpdateAvatar);
  let isFollow = useSelector((state) => state.user.isFollow);

  let isUpdateBackground = useSelector(
    (state) => state.user.isUpdateBackground
  );

  useEffect(() => {
    let getCurrentUser = async () => {
      dispatch(getUser());
      let resp = await dispatch(getUserProfile(id));
      resp = unwrapResult(resp);
      setUserProfile(resp);
    };

    getCurrentUser();
  }, [isFollow]);

  useEffect(() => {
    if (currentUser.background) {
      setTempPhoto({ ...tempPhoto, background: currentUser.background });
    }
  }, [currentUser]);
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

  const followUser = async () => {
    dispatch(toggleFollowUser(userProfile._id));
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
            src={tempPhoto.avatar || userProfile.avatar}
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
          {userProfile.full_name}
        </Typography>
        <Typography className={classes.username}>
          @{userProfile.username}
        </Typography>
      </div>
      <Grid container className={classes.userInfo}>
        <div>
          <Typography className={classes.department}>
            <strong>Khoa:</strong>{" "}
            {userProfile.department && userProfile.department[0].name}
          </Typography>
          <Typography className={classes.industry}>
            <strong>Ngành:</strong>{" "}
            {userProfile.industry && userProfile.industry[0].name}
          </Typography>
          <Typography className={classes.course}>
            <strong>Khóa:</strong> {userProfile.course}
          </Typography>
          <Typography className={classes.class}>
            <strong>Lớp:</strong> {userProfile.class_room}
          </Typography>
          {userProfile.student_type === "STUDENT" ? (
            <Typography className={classes.class}>
              <strong>Chưa ra trường</strong>
            </Typography>
          ) : (
            <Typography className={classes.class}>
              <strong>Đã ra trường</strong>
            </Typography>
          )}
          <Box display="flex">
            <Box display="flex" alignItems="center">
              <Icons.LocationIcon className={classes.infoIcon} />
              <Typography className={classes.joinAt}>
                {userProfile.from
                  ? ` Đến từ ${userProfile.from}`
                  : "Chưa cập nhật"}
              </Typography>
            </Box>
            {/* <Box display="flex" alignItems="center" ml={1}>
              <Icons.DateIcon className={classes.infoIcon} />
              <Typography className={classes.joinAt}>
                Tham gia từ
                <Moment format="DD/MM/YYYY"><span style={{fontSize: "15px"}}>{userProfile.create_at} </span></Moment>
              </Typography>
            </Box> */}
          </Box>
          <Grid container>
            <Typography className={classes.followState}>
              <strong>
                {userProfile.followers && userProfile.followers.length}
              </strong>{" "}
              theo dõi{" "}
            </Typography>
            <Typography className={classes.followState}>-</Typography>
            <Typography className={classes.followState}>
              <strong>
                {userProfile.following && userProfile.following.length}
              </strong>{" "}
              đang theo dõi
            </Typography>
          </Grid>
        </div>
        {currentUser._id === userProfile._id ? (
          <Button
            size="small"
            variant="outlined"
            className={classes.btnUpdate}
            onClick={() => history.push("/update-profile/123")}
          >
            Cập nhật thông tin
          </Button>
        ) : currentUser.following.includes(userProfile._id) ? (
          <Button
            size="small"
            variant="outlined"
            className={classes.btnUpdate}
            onClick={followUser}
          >
            Bỏ theo dõi
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            className={classes.btnUpdate}
            onClick={followUser}
          >
            Theo dõi
          </Button>
        )}
      </Grid>
      <hr />
      <Grid container className={classes.timeline}>
        <TabBar />
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(ProfileInfo);
