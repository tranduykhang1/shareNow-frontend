import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import FbImageLibrary from "react-fb-image-grid";
import lottie from "lottie-web";

import animation from "assets/Animation/heart-animation2.json";
import emojiSound from "assets/Sound/emoji-sound.mp3";
import Icons from "constants/Icons/Icons";
import style from "./Style";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import CommentPage from "components/Main/Comment/CommentPage/CommentPage";
import PostSke from "components/shared/Skeleton/PostSke";

const PostItems = (props) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const heartRel = useRef();
  const { path } = useRouteMatch();
  const { classes } = props;
  const { url } = useRouteMatch();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  useEffect(() => {
    if (heartRel) {
      lottie.loadAnimation({
        container: heartRel.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        duration: 1000,
        animationData: animation,
      });
    }
    if (isAnimated) {
      setTimeout(() => {
        setIsAnimated(false);
      }, [2700]);
    }
  }, [isAnimated]);
  const [colors, setColors] = useState([
    "https://picsum.photos/200/300?random=1",
    "https://picsum.photos/200/300?random=2",
    "https://picsum.photos/200/300?random=7",
    "https://picsum.photos/200/300?random=3",
    "https://picsum.photos/200/300?random=4",
    "https://picsum.photos/200/300?random=5",
    "https://picsum.photos/200/300?random=6",
  ]);

  const emojiClick = () => {
    const sound = new Audio(emojiSound);
    sound.play();
    setIsAnimated(!isAnimated);
  };

  return (
    <Grid item={true} sm={10} md={12} className={classes.postItem}>
      {isLoading ? (
        <PostSke />
      ) : (
        <Card className={classes.cardContainer}>
          <CardHeader
            avatar={
              <Avatar src={colors[0]} className={classes.avatar}></Avatar>
            }
            title={
              <React.Fragment>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link to="/">
                    <Typography
                      component={"span"}
                      className={classes.postUsername}
                    >
                      Username
                    </Typography>
                  </Link>
                  {url === "/group" && (
                    <Link>
                      <Typography
                        component={"span"}
                        className={classes.postGroupName}
                      >
                        - Groups
                      </Typography>
                    </Link>
                  )}
                  <Tooltip title="Báo cáo">
                    <Icons.ReportIcon className={classes.reportIcon} />
                  </Tooltip>
                </div>
              </React.Fragment>
            }
            subheader="3 hours ago"
          />
          <div style={{ position: "relative" }}>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1" style={{ fontSize: "20px" }}>
                Khi học trên ghế nhà trường, chúng ta đã rất quen thuộc với việc
                phát triển sản phẩm với mô hình Monolithic, nói nôm na là toàn
                bộ code được đóng gói phát triển trên duy nhất một project.
              </Typography>
            </CardContent>
            <CardMedia>
              <FbImageLibrary images={colors} />
            </CardMedia>
            <CardActions disableSpacing className={classes.cardActions}>
              <Grid container alignItems="center">
                <Typography variant="subtitle1" color="textSecondary">
                  Tag:
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.tagItems}
                >
                  Tag1
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className={classes.tagItems}
                >
                  Tag2
                </Typography>
              </Grid>
              <Grid container className={classes.cardInteract}>
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.wrapperIcon}
                >
                  <Icons.CommentIcon
                    className={classes.interactIcons}
                    color="error"
                  />
                  <Typography className={classes.countNumber}>100</Typography>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.wrapperIcon}
                >
                  {isAnimated && (
                    <div
                      className={classes.heartAnimation}
                      ref={heartRel}
                    ></div>
                  )}
                  <Icons.FavoriteIcon
                    className={classes.interactIcons}
                    onClick={emojiClick}
                  />

                  <Typography className={classes.countNumber}>100</Typography>
                </Box>
              </Grid>
            </CardActions>
          </div>
          {path === "/post/:id" && <CommentPage />}
        </Card>
      )}
    </Grid>
  );
};

export default withStyles(style)(PostItems);
