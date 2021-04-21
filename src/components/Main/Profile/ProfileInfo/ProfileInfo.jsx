import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";

import TabBar from '../TabPanel/TabBar'
import Icons from "constants/Icons/Icons";
import style from "./Style";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const ProfileInfo = (props) => {
  const { classes } = props;
  const bgCover = "https://wallpaperaccess.com/full/2409545.jpg",
    avatar = "https://picsum.photos/200/300?random=2";

  return (
    <Grid item={true} sm={12} md={12} style={{ padding: "0 40px" }}>
      <Grid item={true} md={12} className={classes.backgroundWrapper}>
        <Grid
          item={true}
          md={12}
          sm={7}
          className={classes.backgroundCover}
          style={{ backgroundImage: `url(${bgCover})` }}
        ></Grid>
        <Avatar src={avatar} className={classes.avatar}>
          H
        </Avatar>
      </Grid>
      <div className={classes.importantInfo}>
        <Typography className={classes.fullName}>Leah Collins</Typography>
        <Typography className={classes.username}>@Katie</Typography>
      </div>
      <Grid container className={classes.userInfo}>
        <div>
          <Typography className={classes.department}>
            <strong>Khoa:</strong> IT
          </Typography>
          <Typography className={classes.industry}>
            <strong>Ngành:</strong> Software Engineer
          </Typography>
          <Typography className={classes.class}>
            <strong>Lớp:</strong> SE0117
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
              <strong>10</strong> Theo dõi - <strong>20</strong> đang theo dõi
            </Typography>
          </Grid>
        </div>
        <Button className={classes.btnUpdate}>Cập nhật thông tin</Button>
      </Grid>
      <hr />
      <Grid container className={classes.timeline}>
        <TabBar/>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(ProfileInfo);
