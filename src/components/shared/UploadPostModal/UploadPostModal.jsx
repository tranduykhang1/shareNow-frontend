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
import CustomSelect from "../Input/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { toggleUploadForm } from "redux/toggleComponent";
import { useRouteMatch } from "react-router";

const UploadPostModel = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState([]);

  const { pathname} = window.location
  //get state from store
  let toggle = useSelector((state) => state.toggle.uploadForm);
  let departmentList = useSelector((state) => state.theCurriculum.departments);
  let industryList = useSelector((state) => state.theCurriculum.industries);
  //

  useEffect(() => {
    if (isShow) {
      document.addEventListener("click", toggleEmoji);
    }
    return () => {
      document.removeEventListener("click", toggleEmoji);
    };
  });
  useEffect(() => {
    setOpen(toggle);
  }, [toggle]);

  //handle event
  const onEmojiClick = (e, emojiObject) => {};
  const toggleEmoji = () => {
    setIsShow(!isShow);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(toggleUploadForm(false));
  };
  const uploadStatus = () => {};

  return (
    <div>
      {/* <Button onClick={handleClickOpen}>click</Button> */}
      <Dialog open={open} onClose={handleClose}>
        <h5 className={classes.title}>Tạo bài đăng mới</h5>
        <DialogContent>
          <Grid item={true} sm={12} md={12} className={classes.modalContent}>
            <form onSubmit={handleSubmit(uploadStatus)}>
              <TextareaAutosize
                className={classes.capInput}
                rowsMin={3}
                rowsMax={3}
                aria-label="maximum height"
                defaultValue={chosenEmoji}
                placeholder="Hãy chia sẽ điều gì đó..."
                ref={register}
              />
              {pathname === "/" && (
                <Box display="flex" justifyContent="space-between">
                  <CustomSelect
                    id="department"
                    name="department"
                    require="true"
                    label="Chủ đề:"
                    // value={value}
                    register={register}
                    options={departmentList}
                  />
                  <CustomSelect
                    id="tag"
                    name="tag"
                    require="true"
                    label="Tag:"
                    // value={value}
                    register={register}
                    options={industryList}
                  />
                </Box>
              )}
              <Grid container className={classes.cardFooter}>
                <Box display="flex" className={classes.icons}>
                  <Typography color="textSecondary" className={classes.exDesc}>
                    Thêm vào bài đăng
                  </Typography>
                  <label htmlFor="photo" style={{ height: 15 }}>
                    <Icons.ImgIcon className={classes.iconPhoto} />
                  </label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    defaultValue=""
                    ref={register}
                    style={{ display: "none" }}
                    multiple
                  />

                  <Icons.MoodIcon
                    className={classes.iconMood}
                    onClick={toggleEmoji}
                  />
                </Box>

                <Button
                  variant="contained"
                  className={classes.btnShare}
                  disabled={true}
                >
                  Chia sẻ
                </Button>
              </Grid>
              {isShow && <Picker onEmojiClick={onEmojiClick} />}
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(style)(UploadPostModel);
