import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { InputBase, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  editComment,
  postComment,
  postCommentGroup,
  setCurrentComment,
} from "redux/interactive";
import { useRouteMatch } from "react-router-dom";

const CommentForm = (props) => {
  const inputRef = useRef();

  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { classes } = props;
  const [isShow, setIsShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState({
    post_id: "",
    text: "",
    replyId: "",
    replyName: "",
  });

  let postId = useSelector((state) => state.toggle.post_id);
  let replyTo = useSelector((state) => state.toggle.reply);
  let currentComment = useSelector((state) => state.interactive.currentComment);

  useEffect(() => {
    if (replyTo) {
      setComment({
        ...comment,
        replyName: replyTo.comment_by.name,
        replyId: replyTo.comment_by.id,
      });
    }
  }, [replyTo]);
  useEffect(() => {
    setComment({ ...comment, post_id: postId });
  }, [postId]);

  useEffect(() => {
    if (currentComment) {
      setIsEdit(true);
      setComment({
        ...comment,
        text: currentComment.content,
        comment_id: currentComment.id,
      });
    }
  }, [currentComment]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(path === "/group/:id");
    if (path === "/group/:id" || path === "/groups") {
      dispatch(postCommentGroup(comment));
      setComment({ ...comment, text: "", replyId: "", replyName: "" });
      dispatch(setCurrentComment(false));
    } else {
      if (isEdit) {
        setIsEdit(false);
        dispatch(editComment(comment));
        dispatch(setCurrentComment(false));
        setComment({ ...comment, text: "", replyId: "", replyName: "" });
      } else {
        dispatch(postComment(comment));
        setIsShow(false);
        setIsEdit(false);
        setComment({ ...comment, text: "", replyId: "", replyName: "" });
      }
    }
  };

  const togglePicker = () => {
    setIsShow(!isShow);
  };
  const onEmojiClick = (e, emojiObject) => {
    let { emoji } = emojiObject;
    let ref = inputRef.current;
    ref.focus();
    let start = comment.text.substring(0, ref.selectionStart);
    let end = comment.text.substring(ref.selectionStart);
    let msg = start + emoji;
    setComment({ ...comment, text: msg });
    // setCursorPosition(start.length + emoji.length);
  };
  const inputChange = (e) => {
    let { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  return (
    <>
      {isShow && <Picker onEmojiClick={onEmojiClick} />}
      {comment.replyName && (
        <b style={{ marginLeft: "5%" }}> Trả lời: {comment.replyName}</b>
      )}
      <form onSubmit={onSubmit} className={classes.commentForm}>
        <Icons.MoodIcon className={classes.emojiIcon} onClick={togglePicker} />

        <InputBase
          fullWidth
          name="text"
          value={comment.text}
          ref={inputRef}
          placeholder="Nhập bình luận của bạn"
          className={classes.commentInput}
          onChange={inputChange}
          autoComplete="off"
        />

        <Icons.SendIcon
          className={classes.sendCommentIcon}
          onClick={onSubmit}
        />
      </form>
    </>
  );
};

export default withStyles(style)(CommentForm);
