import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { InputBase, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

const CommentForm = (props) => {
  const inputRef = useRef();

  const [open, setOpen] = useState(false);
  const { classes } = props;
  const [isShow, setIsShow] = useState(false);
  const [comment, setComment] = useState({  post_id: "",text: "", replyTo: "" });

  let postId = useSelector(state => state.toggle.post_id)

  useEffect(() =>{
    setComment({...comment, post_id: postId});
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();
    console.log(comment)
  };

  const togglePicker = () => {
    setIsShow(!isShow);
  };
  const onEmojiClick = (e, emojiObject) => {
    let { emoji } = emojiObject;
    let ref = inputRef.current;
    ref.focus()
    let start = comment.text.substring(0, ref.selectionStart);
    let end = comment.text.substring(ref.selectionStart);
    let msg = start + emoji;
    setComment({ ...comment, text: msg });
    // setCursorPosition(start.length + emoji.length);
  };
  const inputChange = (e) => {
    let {name,value} = e.target
    setComment({ ...comment, [name]: value });
  };

  return (
    <>
      {isShow && <Picker onEmojiClick={onEmojiClick} />}

      <form
        onSubmit={postComment}
        className={classes.commentForm}
      >
        <Icons.MoodIcon className={classes.emojiIcon} onClick={togglePicker} />
        <InputBase
          fullWidth
          name="text"
          value={comment.text}
          ref={inputRef}
          placeholder="Nhập bình luận của bạn"
          className={classes.commentInput}
          onChange={inputChange}
        />

        <Icons.SendIcon className={classes.sendCommentIcon} onClick={postComment} />
      </form>
    </>
  );
};

export default withStyles(style)(CommentForm);
