import { Grid, withStyles } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import PostList from "components/shared/Post/PostList/PostList";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { checkUserIn, newsInGroup } from "redux/group";
import GroupDetailHeader from "../GroupDetailHeader/GroupDetailHeader";
import GroupDetailMembers from "../GroupDetailHeader/GroupDetailMembers";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
};

const GroupDetailPage = (props) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [success, setSuccess] = useState(false);
  let [currentGroup, setGroup] = useState();
  let isUpload = useSelector((state) => state.group.uploadForm);
  let group = useSelector((state) => state.group.groupDetail);
  let isJoin = useSelector((state) => state.group.isJoin);
  let isAdd = useSelector((state) => state.group.isAdd);
  let isCreatePost = useSelector((state) => state.group.isCreatePost);

  useEffect(() => {
    if (group) {
      dispatch(checkUserIn(group._id));
    }
  }, [group, isAdd]);

  useEffect(() => {
    if (isUpload > 0) {
      setSuccess(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2300);
  }, [isUpload]);

  useEffect(() => {
    if (isCreatePost > 0) {
      setSuccess(true);
    }
    setTimeout(() => {
      setSuccess(false);
    }, 2300);
  }, [isCreatePost]);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(newsInGroup(id));
      setGroup(unwrapResult(resp));
    };
    fetchData();
  }, [isCreatePost]);

  return (
    <Grid item sm={12} md={6} style={style}>
      {success ? <SuccessAnimation text={"Thành công"}/> : ""}
      <GroupDetailHeader />
      {isJoin ? (
        <>
          <GroupDetailMembers group={group.admin_key} />
          {currentGroup && <PostList data={currentGroup} />}
        </>
      ) : isJoin ? (
        <p style={{ textAlign: "center", marginTop: 50 }}>
          Hãy tham gia nhóm để xem bài viết
        </p>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default GroupDetailPage;
