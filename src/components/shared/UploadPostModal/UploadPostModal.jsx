import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  TextareaAutosize,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import Picker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import style from "components/Main/Home/UploadForm/Style";
const UploadPostModel = (props) => {
  const { classes } = props;

  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState([]);

  const onEmojiClick = (e, emojiObject) => {};
  const toggleEmoji = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    if (isShow) {
      document.addEventListener("click", toggleEmoji);
    }
    return () => {
      document.removeEventListener("click", toggleEmoji);
    };
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const uploadStatus = () => {};

  return (
    <>
      {/* <Button onClick={handleClickOpen}>click</Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Tạo bài đăng mới</DialogTitle>
        <DialogContent>
          <Grid item={true} sm={12} md={12} className={classes.modalContent}>
            <form onSubmit={handleSubmit(uploadStatus)}>
              <TextareaAutosize
                className={classes.capInput}
                rowsMax={2}
                aria-label="maximum height"
                defaultValue={chosenEmoji}
                placeholder="Hãy chia sẽ điều gì đó..."
                ref={register}
              />
              <Grid container className={classes.cardFooter}>
                <Box display="flex" className={classes.icons}>
                  <Typography color="textSecondary" className={classes.exDesc}>
                    Thêm vào bài đăng
                  </Typography>
                  <InputLabel htmlFor="photo">
                    <Icons.ImgIcon className={classes.iconPhoto} />
                  </InputLabel>
                  <TextField
                    type="file"
                    name="photo"
                    id="photo"
                    defaultValue=""
                    ref={register}
                    style={{ display: "none" }}
                  />

                  <Icons.MoodIcon
                    className={classes.iconMood}
                    onClick={toggleEmoji}
                  />
                </Box>

                <Button variant="contained" className={classes.btnShare}>
                  Chia sẻ
                </Button>
              </Grid>
              {isShow && <Picker onEmojiClick={onEmojiClick} />}
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(style)(UploadPostModel);
