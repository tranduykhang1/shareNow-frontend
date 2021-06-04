import { Grid, withStyles } from "@material-ui/core";
import {} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
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
  let isCreate = useSelector((state) => state.post.isCreate);
  let posts = useSelector((state) => state.post.postList);

  useEffect(() => {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        setPage(page + 1);
      }
    };
  });

  useEffect(() => {
    if (isActive) {
      setSuccess(true);
    }

    if (isActive > 0) {
      setSuccess(true);
    }

    setTimeout(() => {
      setSuccess(false);
    }, 1650);
  }, [isActive, isCreate]);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getNews(page));
      resp = unwrapResult(resp);
      setPostList(resp);
    };
    fetchData();
  }, [page,isCreate]);
  useEffect(() => {
    setPostList(posts);
  }, [posts, ]);

  return (
    <Grid item sm={12} md={6} style={style} className="responsiveGrid">
      {success && <SuccessAnimation />}
      <UploadCard />
      <TagList />
      {postList && <PostList data={postList} />}
    </Grid>
  );
};

export default withStyles(style)(HomePage);
