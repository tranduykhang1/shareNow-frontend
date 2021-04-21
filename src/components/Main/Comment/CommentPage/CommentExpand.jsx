import { Box, Button, Grid, Typography, withStyles } from "@material-ui/core";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Picker from "emoji-picker-react";

import style from "./Style";
import CommentList from "../CommentList/CommentList";
import CommentForm from "./CommentForm";

const CommentExpand = (props) => {
  const { classes } = props;

  const [isShowPicker, setIsShowPicker] = useState(false);
  const togglePicker = () => {
    setIsShowPicker(!isShowPicker);
  };

  return (
    <Grid className={classes.commentContainer}>
      <hr style={{marginTop: '10px !important'}}/>
      <Box id="alert-dialog-title" className={classes.commentHeader}>
        <Typography className={classes.headerTitle}>
          Bình luận của bài viết
        </Typography>
      </Box>
      <Box className={classes.commentBodyExpand}>
        <CommentList />
      </Box>
      <Box className={classes.commentFooter}>
        {isShowPicker && <Picker />}
        <CommentForm />
      </Box>
    </Grid>
  );
};

export default withStyles(style)(CommentExpand);
