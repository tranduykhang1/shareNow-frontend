import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { InputBase, withStyles } from "@material-ui/core";

const CommentForm = (props) => {
  const pickerRel = useRef();

  const [open, setOpen] = useState(true);
  const { classes } = props;
  const { register, handleSubmit } = useForm();
  const [isShowPicker, setIsShowPicker] = useState(false);

  const postComment = data =>{

  }

  const togglePicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  return (
    <form onSubmit={handleSubmit(postComment)} className={classes.commentForm}>
      <Icons.MoodIcon className={classes.emojiIcon} onClick={togglePicker} />
      <InputBase
        fullWidth
        name="comment"
        placeholder="Nhập bình luận của bạn"
        inputRef={register}
        className={classes.commentInput}
      />
      <Icons.SendIcon className={classes.sendCommentIcon} />
    </form>
  );
};

export default withStyles(style)(CommentForm);
