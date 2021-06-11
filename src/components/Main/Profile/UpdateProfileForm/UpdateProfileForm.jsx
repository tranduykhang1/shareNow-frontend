import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  withStyles,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Style from "./Style";
import { useForm } from "react-hook-form";
import CustomInput from "components/shared/Input/CustomInput";
import CustomSelect from "components/shared/Input/CustomSelect";
import Loading from "components/shared/Loading/Loading";
import Icons from "constants/Icons/Icons";
import { getDepartments, getIndustries } from "redux/theCurriculum";
import { updateProfile } from "redux/user";
import { unwrapResult } from "@reduxjs/toolkit";
import SuccessAnimation from "components/shared/SuccessAnimtion/SuccessAnimation";
import toast, { Toaster } from "react-hot-toast";

const style = {
  marginLeft: "21.5%",
  padding: "0 40px",
  // boxShadow: "1px 1px 5px 1px #e4e4e4",
  // backgroundColor: "white",
};

const schema = yup.object().shape({
  full_name: yup.string().required("Mục này không nên để trống"),
  department: yup.string().required("Mục này không nên để trống"),
  industry: yup.string().required("Mục này không nên để trống"),
  course: yup.string().required("Mục này không nên để trống"),
  class_room: yup.string().required("Mục này không nên để trống"),
  student_code: yup
    .string()
    .min(7, "MSSV không hợp lệ!")
    .max(7, "MSSV không hợp lệ!")
    .required("Mục này không nên để trống"),
  class_room: yup.string().required("Mục này không nên để trống"),
});

const UpdateProfileForm = (props) => {
  const { classes } = props;
  const { preValues } = props;

  const dispatch = useDispatch();
  //
  //
  const { register, handleSubmit, errors } = useForm({
    defaultValues: preValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getIndustries());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Cập nhật thông tin thành công!");
    }
  }, [isSuccess]);

  let options = {
    genderOptions: [
      {
        _id: 1,
        name: "Nam",
      },
      {
        _id: -1,
        name: "Nữ",
      },
    ],
    studentTypeOptions: [
      {
        _id: "OLD_STUDENT",
        name: "Đã ra trường",
      },
      {
        _id: "STUDENT",
        name: "Chưa ra trường",
      },
    ],
  };

  let departmentList = useSelector((state) => state.theCurriculum.departments);
  let industryList = useSelector((state) => state.theCurriculum.industries);

  const onChange = () => {};
  const onSubmit = async (data) => {
    setIsLoading(true);
    let response = await dispatch(updateProfile(data));
    response = unwrapResult(response);
    setIsLoading(false);
    if (response === "Update success!") {
      setIsSuccess(true);
    }
  };

  return (
    <Grid item sm={12} md={6} style={style} className="responsiveGrid">
      <div>
        <Toaster />
      </div>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center">
          <Icons.BackIcon
            onClick={() => history.goBack()}
            className={classes.goBackIcon}
          />
          <h3 className={classes.title}>Cập nhật thông tin</h3>
        </Box>
        <Box>
          <a href="/update-password">
            <Button variant="outlined" color="primary">Đổi mật khẩu</Button>
          </a>
        </Box>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Họ tên:"
          name="full_name"
          type="text"
          register={register}
          autoComplete="email"
          require="true"
          errors={errors.full_name}
        />
        <CustomInput
          label="Tên người dùng:"
          name="username"
          type="text"
          register={register}
          autoComplete="email"
          require="true"
        />
        <CustomInput
          label="Đến từ:"
          name="from"
          type="text"
          register={register}
          require="true"
        />
        <CustomInput
          label="Sinh nhật:"
          name="birthday"
          type="date"
          register={register}
          require="true"
        />
        <Box display="flex" justifyContent="space-between">
          <CustomSelect
            id="gender"
            name="gender"
            require="true"
            label="Bạn là: "
            register={register}
            onChange={onChange}
            defaultValue={preValues.gender}
            options={options.genderOptions}
            require="true"
          />
          <CustomSelect
            id="student_type"
            name="student_type"
            require="true"
            label="Bạn đang là sinh viên?"
            register={register}
            onChange={onChange}
            defaultValue={preValues.student_type}
            options={options.studentTypeOptions}
            require="true"
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <CustomSelect
            id="department"
            name="department"
            require="true"
            label="Khoa:"
            defaultValue={preValues.department && preValues.department[0]._id}
            register={register}
            onChange={onChange}
            options={departmentList}
          />
          <CustomSelect
            id="industry"
            name="industry"
            require="true"
            label="Ngành:"
            defaultValue={preValues.industry && preValues.industry[0]._id}
            register={register}
            onChange={onChange}
            options={industryList}
          />
        </Box>
        <CustomInput
          label="Khóa:"
          name="course"
          type="number"
          register={register}
          require="true"
          errors={errors.course}
        />
        <CustomInput
          label="Lớp:"
          name="class_room"
          type="text"
          register={register}
          require="true"
          errors={errors.class}
          errors={errors.class_room}
        />
        <CustomInput
          label="MSSV:"
          name="student_code"
          type="number"
          register={register}
          require="true"
          errors={errors.student_code}
        />
        <Box mt={1}>
          <Typography>Giới thiệu về bạn:</Typography>
          <TextareaAutosize
            className={classes.bio}
            name="bio"
            rowsMax={2}
            rowsMin={2}
            aria-label="maximum height"
            placeholder="Hãy mô tả gì đó về bạn..."
            ref={register}
          />
        </Box>

        <Box display="flex" justifyContent="space-between">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <Button
                variant="contained"
                color="default"
                fullWidth
                type="submit"
                className={classes.btnBack}
              >
                Trở lại
              </Button>
              <Button
                variant="contained"
                color="default"
                fullWidth
                type="submit"
                className={classes.btnSubmit}
              >
                Lưu
              </Button>
            </>
          )}
        </Box>
      </form>
    </Grid>
  );
};

UpdateProfileForm.propTypes = {
  preValues: PropTypes.object.isRequired,
};

export default withStyles(Style)(UpdateProfileForm);
