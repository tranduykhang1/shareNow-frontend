import { Grid, withStyles } from "@material-ui/core";
import PostList from "components/shared/Post/PostList/PostList";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserIn } from "redux/group";
import GroupDetailHeader from "../GroupDetailHeader/GroupDetailHeader";
import GroupDetailMembers from "../GroupDetailHeader/GroupDetailMembers";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
};

const GroupDetailPage = (props) => {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  let [currentGroup, setGroup] = useState("");
  let isUpload = useSelector((state) => state.group.uploadForm);
  let group = useSelector((state) => state.group.groupDetail);
  let isJoin = useSelector((state) => state.group.isJoin);
  let isAdd = useSelector((state) => state.group.isAdd);

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
    setGroup(group);
  }, [group]);

  return (
    <Grid item sm={12} md={6} style={style}>
      {success && <SuccessAnimation />}
      <GroupDetailHeader />
      {isJoin ? (
        <>
          <GroupDetailMembers group={group.admin_key} />
          {currentGroup && <PostList data={currentGroup.post} />}
        </>
      ) : group ? (
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
