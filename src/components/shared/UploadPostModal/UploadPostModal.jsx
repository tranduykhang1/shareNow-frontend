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
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import style from "components/Main/Home/UploadForm/Style";
import CustomSelect from "../Input/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { toggleUploadForm } from "redux/toggleComponent";
import { useRouteMatch } from "react-router";
import { createGroupPost } from "redux/group";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "../Loading/Loading";
import { createPost } from "redux/post";
import { yupResolver } from "@hookform/resolvers/yup";

let array = [];

const UploadPostModel = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [open, setOpen] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [tempPhoto, setTemPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ tag: "", topic: "" });


  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  let groupDetail = useSelector((state) => state.group.groupDetail);

  const [post, setPost] = useState({
    group_id: "",
    photos: [],
    caption: "",
    topic: "",
    tag: "",
  });

  //get state from store
  let toggle = useSelector((state) => state.toggle.uploadForm);
  let departmentList = useSelector((state) => state.theCurriculum.departments);
  let tagList = useSelector((state) => state.theCurriculum.tagList);
  let isCreatePost = useSelector((state) => state.group.isCreatePost);
  let isCreate = useSelector((state) => state.post.isCreate);
  //

  useEffect(() => {
    if (window.location.pathname.split("/")[1] === "group") {
      setIsGroup(true);
    }
  });

  useEffect(() => {
    setOpen(!open);
  }, [toggle]);

  useEffect(() => {
    setPost({ ...post, group_id: groupDetail._id });

    if (isCreatePost > 0 || isCreate > 0) {
      setPost({ group_id: "", photos: [], caption: "", topic: "", tag: "" });
      array = [];
    }
  }, [groupDetail, isCreatePost, isCreate]);

  const onEmojiClick = (e, emojiObject) => {
    let { emoji } = emojiObject;
    let ref = inputRef.current;
    ref.focus();

    let start = post.caption.substring(0, ref.selectionStart);
    let end = post.caption.substring(ref.selectionStart);
    let msg = start + emoji + end;
    setPost({ ...post, caption: msg });
    // setCursorPosition(start.length + emoji.length);
  };

  const toggleEmoji = () => {
    setIsShow(!isShow);
  };

  const handleClose = () => {
    dispatch(toggleUploadForm());
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
    setTemPhoto(array);
    setPost({ ...post, [name]: value });
  };

  const uploadStatus = () => {
    if (isGroup) {
      setLoading(true);
      let resp = dispatch(createGroupPost(post));
      resp = unwrapResult(resp);
      dispatch(toggleUploadForm());
      setLoading(false);
    } else {
      //  dispatch()
      if (post.topic && post.tag) {
        setLoading(true);
        let resp = dispatch(createPost(post));
        resp = unwrapResult(resp);
        console.log(post);
        dispatch(toggleUploadForm());
        setLoading(false);
      } else {
        if (!post.topic) {
          setErrors({ ...errors, topic: "Cần chọn chủ đề" });
        }
        if (!post.tag) {
          setErrors({ ...errors, tag: "Cần chọn thẻ" });
        }
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        style={{ height: "0 !important" }}
      >
        {!isGroup ? (
          <h5 className={classes.title}>Tạo bài đăng mới</h5>
        ) : (
          <h5 className={classes.title}>Tạo bài đăng trong nhóm</h5>
        )}
        <DialogContent>
          <Grid item={true} sm={12} md={12} className={classes.modalContent}>
            <form onSubmit={handleSubmit(uploadStatus)}>
              <TextareaAutosize
                name="caption"
                className={classes.capInput}
                rowsMin={3}
                rowsMax={3}
                aria-label="maximum height"
                value={post.caption}
                placeholder="Hãy chia sẽ điều gì đó..."
                onChange={inputChange}
                ref={inputRef}
              />
              {!isGroup && (
                <Box display="flex" justifyContent="space-between">
                  <CustomSelect
                    id="department"
                    name="topic"
                    require="true"
                    label="Chủ đề:"
                    value={post.topic}
                    register={register}
                    onChange={selectOption}
                    options={departmentList}
                    errors={errors.topic}
                  />
                  <CustomSelect
                    id="tag"
                    name="tag"
                    require="true"
                    label="Tag:"
                    value={post.tag}
                    onChange={selectOption}
                    register={register}
                    options={tagList}
                    errors={errors.tag}
                  />
                </Box>
              )}
              <Grid container className={classes.cardFooter}>
                <Box
                  display="flex"
                  className={classes.icons}
                  alignItems="center"
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
                    ref={register}
                    style={{ display: "none" }}
                    multiple
                    onChange={inputChange}
                  />

                  <Icons.MoodIcon
                    className={classes.iconMood}
                    onClick={toggleEmoji}
                  />
                </Box>
                {loading ? (
                  <Loading />
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    className={classes.btnShare}
                  >
                    Chia sẻ
                  </Button>
                )}
              </Grid>
              {isShow && <Picker onEmojiClick={onEmojiClick} />}
            </form>
          </Grid>
          <Box display="flex" align="center">
            {tempPhoto.map((photo, index) => {
              return (
                <Box
                  m={1}
                  key={index}
                  style={{ boxShadow: "0px 0px 3px 2px #c7c7c7" }}
                >
                  <img src={photo} alt="Ảnh" height="70" width="70" />
                </Box>
              );
            })}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(style)(UploadPostModel);
