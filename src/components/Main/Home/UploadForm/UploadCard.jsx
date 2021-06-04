import {
  Avatar,
  Box,
  Button,
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import style from "./Style";
import Icons from "constants/Icons/Icons";
import { toggleUploadForm } from "redux/toggleComponent";
import { useDispatch, useSelector } from "react-redux";

const UploadCard = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const [isShow, setIsShow] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState([]);

  const avatar = "https://picsum.photos/200/300?random=2";
  const currentUser = useSelector((state) => state.user.currentUser)

  //
  const uploadStatus = (data) => {
    console.log(data);
  };

  const toggle = () => {
    dispatch(toggleUploadForm(true));
  };

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
  }, [isShow]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji([...chosenEmoji, emojiObject.emoji]);
  };

  return (
    <Grid
      container
      item={true}
      alignItems="center"
      md={11}
      sm={12}
      className={classes.uploadCard}
    >
      <Grid className={classes.cardAvatar}>
        <Avatar className={classes.avatar} src={currentUser && currentUser.avatar}>
          K
        </Avatar>
      </Grid>
      <Grid item={true} sm={12} md={12} className={classes.cardBody}>
        <div className={classes.clickToShare} onClick={toggle}>
          <span className={classes.slogan}>
            {currentUser && currentUser.full_name.split(" ").pop()}, bạn muốn chia sẻ điều gì?
          </span>
        </div>
        {/* <form onSubmit={handleSubmit(uploadStatus)}>
              <TextareaAutosize
                className={classes.capInput}
                name="caption"
                rowsMax={1}
                rowsMin={1}
                aria-label="maximum height"
                defaultValue={chosenEmoji}
                placeholder="Hãy chia sẽ điều gì đó..."
                ref={register}
              />
              <Grid container className={classes.cardFooter}>
                <Box display="flex" className={classes.icons}>
                  <Typography color="textSecondary" className={classes.exDesc}>Thêm vào bài đăng</Typography>
                  <InputLabel htmlFor="photo" style={{margin: '0px'}}>
                    <Icons.ImgIcon className={classes.iconPhoto} />
                  </InputLabel>
                  <TextField
                    type="file"
                    name="photo"
                    id="photo"
                    defaultValue=""
                    inputRef={register}
                    style={{ display: "none" }}
                  />

                  <Icons.MoodIcon
                    className={classes.iconMood}
                    onClick={toggleEmoji}
                  />
                </Box>

                <Button type="submit" variant="contained" className={classes.btnShare}>
                  Chia sẻ
                </Button>
              </Grid>
              {isShow && <Picker onEmojiClick={onEmojiClick} />}
            </form> */}
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(UploadCard);
