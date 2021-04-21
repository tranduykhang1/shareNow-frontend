import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

import style from "./Style";
import CommentList from "../CommentList/CommentList";
import CommentForm from "./CommentForm"

const CommentDialog = (props) => {
  const pickerRel = useRef();

  const [open, setOpen] = useState(false);
  const { classes } = props;
  const [isShowPicker, setIsShowPicker] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const togglePicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.commentContainer}
      >
        <DialogTitle id="alert-dialog-title" className={classes.commentHeader}>
          <Typography className={classes.headerTitle}>
            Bình luận của bài viết
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.commentBody}>
          <CommentList />
        </DialogContent>
        <DialogActions className={classes.commentFooter}>
          {isShowPicker && <Picker ref={pickerRel} />}
          <CommentForm/>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(style)(CommentDialog);
