import { Avatar, Grid, Box, Typography, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import Moment from "react-moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import style from "./Style";
import { replyTo } from "redux/toggleComponent";
import { useDispatch, useSelector } from "react-redux";
import { removeComment, setCurrentComment } from "redux/interactive";

const CommentItem = (props) => {
  const { classes, data } = props;
  const dispatch = useDispatch();
  const editRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState();

  const currentUser = useSelector((state) => state.user.currentUser);
  const postId = useSelector((state) => state.toggle.post_id);

  const reply = () => {
    dispatch(replyTo(data));
  };

  useEffect(() => {
    setComment({
      id: data.id,
      content: data.content,
    });
  }, [data]);

  const inputChange = (e) => {
    let { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const onEditComment = () => {
    dispatch(setCurrentComment(data));
  };
  const onRemoveComment = () => {
    let data = {
      postId: postId,
      commentId: comment.id,
    };
    dispatch(removeComment(data));
  };

  return (
    <Grid className={classes.commentItem}>
      <Grid container className={classes.commentHeader}>
        <Link to="">
          <Avatar
            className={classes.commentAvatar}
            src={data.comment_by.avatar}
          >
            H
          </Avatar>
        </Link>
        <Box className={classes.commentTextPane}>
          <Typography className={classes.commentUsername}>
            {data.comment_by.name}
          </Typography>

          <Typography className={classes.commentContent}>
            {data.reply_to && (
              <>
                {" "}
                <span>Trả lời</span>{" "}
                <b style={{ marginRight: 3 }}>{data.reply_to}</b>{" "}
              </>
            )}
            {data.content}
          </Typography>

          <Typography className={classes.commentAt}>
            <Moment fromNow>{data.create_at}</Moment>
          </Typography>
        </Box>
        {currentUser._id === data.comment_by.id && (
          <Box display="flex" flexDirection="column">
            <Icons.StudentIcon
              onClick={onEditComment}
              className={classes.icon}
            />
            <Icons.TrashIcon
              onClick={onRemoveComment}
              className={classes.icon}
            />
          </Box>
        )}
      </Grid>
      <Grid className={classes.commentBody}>
        <div className={classes.reply} onClick={reply}>
          <Typography className={classes.replyTo}>Trả lời</Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(CommentItem);
