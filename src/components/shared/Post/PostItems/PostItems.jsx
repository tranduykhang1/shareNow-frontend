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
import Moment from "react-moment";
import { toggleCommentForm } from "redux/toggleComponent";
import { useDispatch, useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

const PostItems = ({ post, classes }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();
  const heartRel = useRef();
  const { path } = useRouteMatch();
  const { url } = useRouteMatch();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    let _id = post.name ? post.post.user._id : post.user.id;
    setIsUser(_id);
  }, [currentUser]);

  useEffect(() => {
    if (post.length) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [post]);
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
  };

  return (
    <Grid item={true} sm={10} md={12} className={classes.postItem}>
      {isLoading ? (
        <PostSke />
      ) : (
        <Card className={classes.cardContainer}>
          <CardHeader
            avatar={
              <Avatar
                src={post.post ? post.post.user.avatar : post.user.avatar}
                className={classes.avatar}
              ></Avatar>
            }
            title={
              <React.Fragment>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Link to={`/profile/${isUser}`}>
                      <Typography
                        component={"span"}
                        className={classes.postUsername}
                      >
                        {post.post ? post.post.user.name : post.user.name}
                      </Typography>
                    </Link>
                    {post.name && (
                      <Link to={`/group/${post._id}`}>
                        <Typography
                          component={"span"}
                          className={classes.postGroupName}
                        >
                          - {post.name}
                        </Typography>
                      </Link>
                    )}
                  </div>
                  {currentUser._id === isUser ? (
                    <Icons.TrashIcon className={classes.reportIcon} />
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            }
            subheader={
              parseInt(
                (new Date() -
                  new Date(post.post ? post.post.create_at : post.create_at)) /
                  (24 * 3600 * 1000)
              ) <= 1 ? (
                <Moment fromNow>
                  {post.post ? post.post.create_at : post.create_at}
                </Moment>
              ) : (
                <Moment format="D MMM YYYY" withTitle>
                  {post.post ? post.post.create_at : post.create_at}
                </Moment>
              )
            }
          />
          <div style={{ position: "relative" }}>
            <CardContent className={classes.cardContent}>
              <Typography variant="body1" style={{ fontSize: "20px" }}>
                {post.post ? post.post.caption : post.caption}
              </Typography>
            </CardContent>
            <CardMedia>
              {post && (
                <FbImageLibrary
                  images={post.post ? post.post.photos : post.photos}
                />
              )}
            </CardMedia>
            <CardActions disableSpacing className={classes.cardActions}>
              {/* <Grid container alignItems="center">
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
              </Grid> */}
              <Grid container className={classes.cardInteract}>
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.wrapperIcon}
                  onClick={() => dispatch(toggleCommentForm(post._id))}
                >
                  <Icons.CommentIcon
                    className={classes.interactIcons}
                    color="error"
                  />
                  <Typography className={classes.countNumber}>
                    {post.post
                      ? post.post.comments.length
                      : post.comments.length}
                  </Typography>
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

                  <Typography className={classes.countNumber}>
                    {post.post ? post.post.likers.length : post.likers.length}
                  </Typography>
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
