import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Grid,
  SwipeableDrawer,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import PostItems from "components/shared/Post/PostItems/PostItems";
import GroupForm from "./GroupForm";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import { getNews } from "redux/post";
import { newsInAllGroup } from "redux/group";

const style = {
  container: {
    marginLeft: "21.5%",
    padding: "0 80px",
  },
  btnToggle: {
    marginTop: 10,
    border: "1px solid #0478b9eb",
    color: "#0478b9eb",
  },
  createForm: {
    width: "30%",
    margin: "20px auto",
    position: "relative",
  },
  formTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: "20px !important",
  },
  select: {
    border: "1px solid #d0d0d0",
    borderRadius: 4,
    width: "100%",
    padding: 9,
  },
  btnCreate: {
    marginTop: 10,
    background: "black",
    color: "white",
    textTransform: "initial",
  },
  label: {
    border: "1px dashed #d0d0d0",
    borderRadius: 4,
    width: "100%",
    height: 200,
    textAlign: "center",
    padding: "90px 9px",
    fontWeight: "normal",
    fontSize: 13,
    cursor: "pointer",
    color: "#a5a5a5",
  },
  prePhoto: {
    position: "absolute",
    height: 200,
    width: "100%",
    zIndex: -1,
  },
};

const GroupPage = (props) => {
  const dispatch = useDispatch();
  // const data = [1, 2, 3, 4, 5, 6, 7];
  const [drawer, setDrawer] = useState(false);
  const [success, setSuccess] = useState(false);

  const postList = useSelector((state) => state.group.posts)




  const renderItems = postList.map((data, i) => {
    return <PostItems key={i} post={data}/>;
  });
  let isUpload = useSelector((state) => state.group.uploadForm);

  useEffect(() =>{
    dispatch(newsInAllGroup())
  },[])

  useEffect(() => {
    if (isUpload) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2300);
    }
  }, [isUpload]);

  return (
    <Grid item sm={12} md={6} style={style.container} className="responsiveGrid">
      {success && <SuccessAnimation />}
      <Grid>
        <Typography className="group-title">Các bài đăng trong nhóm</Typography>
        <div>
          <Button
            fullWidth
            style={style.btnToggle}
            onClick={() => setDrawer(!drawer)}
          >
            Tạo nhóm mới
          </Button>
          <GroupForm drawer={drawer} />
        </div>
      </Grid>
      {renderItems}
    </Grid>
  );
};
export default GroupPage;
