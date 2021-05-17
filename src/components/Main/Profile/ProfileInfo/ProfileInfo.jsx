import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TabBar from "../TabPanel/TabBar";
import Icons from "constants/Icons/Icons";
import style from "./Style";
import bgDefault from "assets/Images/bgDefault.png";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProfileInfo = (props) => {
  const { classes } = props;
  const [background, setBackground] = useState(bgDefault);

  let userState = useSelector((state) => state.user.response);

  useEffect(() => {
    if (userState.background) {
      setBackground(userState.background);
    }
  }, [userState]);

  return (
    <Grid item={true} sm={12} md={12} style={{ padding: "0 40px" }}>
      <Grid item={true} md={12} className={classes.backgroundWrapper}>
        <Grid
          item={true}
          md={12}
          sm={7}
          className={classes.backgroundCover}
          style={{ backgroundImage: `url(${background})` }}
        ></Grid>
        <Avatar src={userState.avatar} className={classes.avatar}>
          H
        </Avatar>
      </Grid>
      <div className={classes.importantInfo}>
        <Typography className={classes.fullName}>{userState.fullname}</Typography>
        <Typography className={classes.username}>{userState.username}</Typography>
      </div>
      <Grid container className={classes.userInfo}>
        <div>
          <Typography className={classes.department}>
            <strong>Khoa:</strong> {userState.department}
          </Typography>
          <Typography className={classes.industry}>
            <strong>Ngành:</strong> {userState.industry}
          </Typography>
          <Typography className={classes.class}>
            <strong>Lớp:</strong> { userState.class}
          </Typography>
          <Box display="flex">
            <Box display="flex" alignItems="center">
              <Icons.LocationIcon className={classes.infoIcon} />
              <Typography className={classes.joinAt}>
                Đến từ Hậu Giang
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
        <Button className={classes.btnUpdate}>Cập nhật thông tin</Button>
      </Grid>
      <hr />
      <Grid container className={classes.timeline}>
        <TabBar />
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(ProfileInfo);
