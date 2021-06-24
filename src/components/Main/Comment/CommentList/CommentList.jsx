import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "components/shared/Loading/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { getCommentGroup, getCommentList } from "redux/interactive";
import CommentItem from "../CommentItem/CommentItem";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState();
  // const commentList = useSelector((state) => state.interactive.commentList)
  let postId = useSelector((state) => state.toggle.post_id);
  let isComment = useSelector((state) => state.interactive.isComment);
  let isEditComment = useSelector((state) => state.interactive.isEditComment);

  const { path } = useRouteMatch();

  useEffect(() => {
    if (path === "/group/:id" || path === "/groups") {
      let fetchData = async () => {
        let resp = await dispatch(getCommentGroup(postId));
        resp = unwrapResult(resp);
        setComments(resp.post.comments);
      };
      fetchData();
    } else {
      let fetchData = async () => {
        let resp = await dispatch(getCommentList(postId));
        resp = unwrapResult(resp);
        setComments(resp.comments);
      };
      fetchData();
    }
  }, [postId, isComment, isEditComment]);

  let renderComment;

  if (comments) {
    renderComment = comments.map((comment, i) => {
      return <CommentItem key={i} data={comment} />;
    });
  }

  return <div>{comments && renderComment}</div>;
};

export default CommentList;
