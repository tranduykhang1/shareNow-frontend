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
import randomatic from "randomatic";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "components/shared/Input/CustomInput";
import PostItems from "components/shared/Post/PostItems/PostItems";
import CustomSelect from "components/shared/Input/CustomSelect";
import { getTagList } from "redux/theCurriculum";
import { createGroup, updateGroup } from "redux/group";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "components/shared/Loading/Loading";
import { useRouteMatch } from "react-router";

const style = {
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

const schema = yup.object().shape({
  groupName: yup.string().required("Bạn chưa nhập tên nhóm"),
});

const GroupForm = (props) => {
  let { group } = props;
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const data = [1, 2, 3, 4, 5, 6, 7];
  const [drawer, setDrawer] = useState(true);
  const [photo, setPhoto] = useState("");
  const [defaultPassword, setDefaultPassword] = useState(
    group ? group.password : randomatic("Aa0", 6)
  );
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      topic: group ? group.topic : "",
      groupName: group ? group.name : "",
      password: defaultPassword,
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  let tagList = useSelector((state) => state.theCurriculum.tagList);
  let isUpload = useSelector((state) => state.group.uploadForm);

  useEffect(() => {
    dispatch(getTagList());
    if (group) {
      setPhoto(group.background);
    }
  }, []);
  useEffect(() => {
    setDrawer(!drawer);
  }, [props.drawer]);

  useEffect(() => {
    if (isUpload > 0) {
      setIsLoading(false);
      setDrawer(false);
    }
  }, [isUpload]);

  const previewPhoto = (e) => {
    let photo = e.target.files[0];
    setPhoto(URL.createObjectURL(photo));
  };

  const toggleDrawer = (state) => {
    setDrawer(state);
  };
  const uploadForm = (data) => {
    setIsLoading(true);
    let tempPhoto = "";
    if (data.photo) {
      tempPhoto = data.photo[0];
    }
    let newData = {
      group_id: group ? group._id : "",
      photo: tempPhoto ? tempPhoto : photo,
      groupName: data.groupName,
      password: defaultPassword,
      topic: data.topic,
    };
    if (path === "/groups") {
      dispatch(createGroup(newData));
    } else {
      dispatch(updateGroup(newData));
    }
  };

  return (
    <Grid item sm={12} md={6} style={style.container}>

      <SwipeableDrawer
        anchor="top"
        open={drawer}
        onClose={() => toggleDrawer(!drawer)}
        onOpen={() => toggleDrawer(true)}
      >
        <Typography align="center" style={style.formTitle}>
          {path === "/groups" ? "Tạo nhóm" : "Cập nhật nhóm"}
        </Typography>
        <form style={style.createForm} onSubmit={handleSubmit(uploadForm)}>
          {photo && (
            <div style={style.prePhoto}>
              <img src={photo} alt="preview" height="100%" width="100%" />
            </div>
          )}
          <label htmlFor="photo" style={style.label}>
            Ảnh nhóm
          </label>
          <input
            name="photo"
            type="file"
            id="photo"
            style={{ display: "none" }}
            onChange={previewPhoto}
            ref={register}
          />
          <CustomInput
            label="Tên nhóm: "
            name="groupName"
            type="text"
            register={register}
            autoComplete="off"
            require="true"
            errors={errors.groupName}
          />

          <Box display="flex" flexDirection="column" mt={1} mb={1}>
            <label htmlFor="" style={{ fontWeight: "normal" }}>
              Chủ đề
            </label>
            <select name="topic" style={style.select} ref={register}>
              <option disabled value="">
                --Chọn--
              </option>
              {tagList.map((tag, index) => {
                return (
                  <option value={tag._id} key={index}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
          </Box>
          <CustomInput
            label="Mật khẩu mặc định: "
            name="password"
            type="text"
            register={register}
            defaultValue={defaultPassword}
            autoComplete="off"
            require="true"
            disabled
          />
          <Typography color="textSecondary" align="center">
            Mặc định nhóm này là riêng tư
          </Typography>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={style.btnCreate}
              fullWidth
            >
              Tiếp theo
            </Button>
          )}
        </form>
      </SwipeableDrawer>
    </Grid>
  );
};
export default GroupForm;
