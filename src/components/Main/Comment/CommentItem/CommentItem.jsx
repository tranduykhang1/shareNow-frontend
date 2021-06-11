import { Avatar, Grid, Box, Typography, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import Moment from "react-moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import style from "./Style";
import { replyTo } from "redux/toggleComponent";
import { useDispatch } from "react-redux";

const CommentItem = (props) => {
  const { classes, data } = props;
  const dispatch = useDispatch();
  const editRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState();

  const reply = () => {
    dispatch(replyTo(data));
  };

  useEffect(() =>{
    setComment({
      id: data.id,
      content: data.content
    })
  }, [data])

  const inputChange = (e) => {
    let {name, value} =e.target
    setComment({...comment, [name]: value });
  };

  const editComment = () => {
    if (editRef.current) {
      let ref = editRef.current;
      ref.focus();
    }
    setIsEdit(!isEdit);
  };
  const removeComment = () => {};

  const onEdit = e => {
    e.preventDefault();
    console.log(comment)
  };

  return (
    <Grid className={classes.commentItem}>
      <Grid container className={classes.commentHeader}>
        <Link to="">
          <Avatar
            className={classes.commentAvatar}
            src="http://res.cloudinary.com/dfniu86vr/image/upload/v1622863383/avatar/pibuqw0blzem9iul5bik.jpg"
          >
            H
          </Avatar>
        </Link>
        <Box className={classes.commentTextPane}>
          <Typography className={classes.commentUsername}>
            {data.comment_by.name}
          </Typography>
          {isEdit ? (
            <form onSubmit={onEdit}>
              <input
                ref={editRef}
                type="text"
                name="content"
                value={comment.content}
                onChange={inputChange}
                className={classes.editInput}
              />
            </form>
          ) : (
            <Typography className={classes.commentContent}>
              {data.content}
            </Typography>
          )}
          <Typography className={classes.commentAt}>
            <Moment fromNow>{data.create_at}</Moment>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Icons.StudentIcon onClick={editComment} className={classes.icon} />
          <Icons.TrashIcon onClick={removeComment} className={classes.icon} />
        </Box>
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
