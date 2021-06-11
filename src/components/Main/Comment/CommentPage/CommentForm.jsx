import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { InputBase, withStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "redux/interactive";

const CommentForm = (props) => {
  const inputRef = useRef();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { classes } = props;
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState({
    post_id: "",
    text: "",
    replyId: "",
    replyName: "",
  });

  let postId = useSelector((state) => state.toggle.post_id);
  let replyTo = useSelector((state) => state.toggle.reply);

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

  const onSubmit = async(e) => {
    e.preventDefault();
    await dispatch(postComment(comment));
    setIsShow(false)
    setComment({ post_id: "", text: "", replyId: "", replyName: "" });
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
      {comment.replyName && <b style={{marginLeft: '5%'}}> Trả lời: {comment.replyName}</b>}
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
