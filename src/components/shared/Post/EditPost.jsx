import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import CustomSelect from "../Input/CustomSelect";

import style from "./PostList/Style";
import Picker from "emoji-picker-react";
import Icons from "constants/Icons/Icons";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
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

let array = [];
const EditPost = ({ classes }) => {
  const [open, setOpen] = useState(true);
  const inputRef = useRef();

  const [isShow, setIsShow] = useState(false);
  const [post, setPost] = useState({});
  const [tempPhoto, setTempPhoto] = useState([]);

  let isEdit = useSelector((state) => state.toggle.editPost);
  let currentPost = useSelector((state) => state.post.currentPost);
  let departmentList = useSelector((state) => state.theCurriculum.departments);
  let tagList = useSelector((state) => state.theCurriculum.tagList);

  useEffect(() => {
    if (currentPost) {
      setPost({
        caption: currentPost.caption,
        tag: currentPost.tags,
        topic: currentPost.topic,
      });
    }
  }, [currentPost]);
  useEffect(() => {
    setOpen(!open);
  }, [isEdit]);

  console.log(currentPost);

  const onEmojiClick = (e, { emoji }) => {
    let ref = inputRef.current;
    let start = post.caption.substring(0, ref.selectionStart);
    let end = post.caption.substring(ref.selectionStart);
    let msg = start + emoji + end;
    setPost({ ...post, caption: msg });
  };

  const selectOption = (e) => {
    let { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const inputChange = (e) => {
    let { name, value } = e.target;
    if (name === "photos") {
      value = e.target.files;
      for (let i = 0; i < value.length; i++) {
        array.push(URL.createObjectURL(value[i]));
      }
    }
    setTempPhoto(array);
    setPost({ ...post, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(post);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cập nhật bài viết"}</DialogTitle>
        <DialogContent>
          <form action="" onSubmit={onSubmit}>
            <TextareaAutosize
              name="caption"
              className={classes.capInput}
              value={post.caption}
              rowsMin={3}
              rowsMax={3}
              aria-label="maximum height"
              // value={post.caption}
              placeholder="Hãy chia sẽ điều gì đó..."
              onChange={inputChange}
              ref={inputRef}
            />

            <Box display="flex" justifyContent="space-between">
              <CustomSelect
                id="department"
                name="topic"
                require="true"
                label="Chủ đề:"
                defaultValue={post.topic}
                onChange={selectOption}
                options={departmentList}
                // errors={errors.topic}
              />
              <CustomSelect
                id="tag"
                name="tag"
                require="true"
                label="Tag:"
                defaultValue={post.tag}
                onChange={selectOption}
                options={tagList}
                // errors={errors.tag}
              />
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                className={classes.icons}
                alignItems="center"
                width="40%"
              >
                <p color="textSecondary" className={classes.exDesc}>
                  Thêm vào bài đăng
                </p>
                <label htmlFor="photo" style={{ height: 15 }}>
                  <Icons.ImgIcon className={classes.iconPhoto} />
                </label>
                <input
                  type="file"
                  name="photos"
                  id="photo"
                  defaultValue=""
                  style={{ display: "none" }}
                  multiple
                  onChange={inputChange}
                />

                <Icons.MoodIcon
                  className={classes.iconMood}
                  onClick={() => setIsShow(!isShow)}
                />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Cập nhật
              </Button>
            </Box>

            {isShow && <Picker onEmojiClick={onEmojiClick} />}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default withStyles(style)(EditPost);
