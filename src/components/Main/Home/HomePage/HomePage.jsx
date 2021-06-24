import { Grid, withStyles } from "@material-ui/core";
import {} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

import PostList from "components/shared/Post/PostList/PostList";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import TagList from "components/shared/TagList/TagList";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "redux/post";

import UploadCard from "../UploadForm/UploadCard";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
};

const HomePage = (props) => {
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);

  let isActive = useSelector((state) => state.user.isActive);
  let isPending = useSelector((state) => state.post.isPending);
  let isCreate = useSelector((state) => state.post.isCreate);
  let isRemove = useSelector((state) => state.post.isRemove);
  let posts = useSelector((state) => state.post.postList);
  let isComment = useSelector((state) => state.interactive.isComment);
  let currentTopic = useSelector((state) => state.theCurriculum.currentTopic);
  let currentTag = useSelector((state) => state.theCurriculum.currentTag);

  useEffect(() => {
    window.onscroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 50
      ) {
        setPage(page + 1);
      }
    };
  });

  useEffect(() => {
    if (isActive) {
      toast.success("Cập nhật thông tin thành công!");
    }
  }, [isActive]);
  useEffect(() => {
    let toastLoading;
    if (isPending) {
      toastLoading = toast.loading("Đang tải bài viết...!");
    }
    if (isCreate > 0 && !isPending) {
      toast.remove(toastLoading);
      toast.success("Tải bài viết thành công!");
    }
  }, [isCreate, isPending]);

  useEffect(() => {
    let fetchData = async () => {
      if (!currentTopic && !currentTag) {
        let resp = await dispatch(getNews(page));
        resp = unwrapResult(resp);
        setPostList(resp);
      }
    };
    fetchData();
  }, [page, isCreate, isRemove, isComment, currentTopic, currentTag]);

  useEffect(() => {
    setPostList(posts);
  }, [posts]);

  return (
    <Grid item sm={12} md={6} style={style} className="responsiveGrid">
      {/* {success && <SuccessAnimation />} */}
      <div>
        <Toaster />
      </div>
      <UploadCard />
      <TagList />
      {postList && <PostList data={postList} />}
    </Grid>
  );
};

export default withStyles(style)(HomePage);
