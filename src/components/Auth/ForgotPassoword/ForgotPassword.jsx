import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import imgConstants from "constants/Images/images.js";
import style from "./ForgotPassword.style";
import CustomInput from "components/shared/Input/CustomInput";
import Loading from "components/shared/Loading/Loading";

//action
import { forgotPassword } from "redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn chưa nhập trường này"),
});

const ForgotPassword = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    let response = await dispatch(forgotPassword(data));
    response = unwrapResult(response);
    setIsLoading(false);
    if (response.status === 200) {
      history.push("/email-confirm");
    } else {
      setErr("Email không tồn tại!");
    }
  };

  return (
    <Grid md={4} sm={6} className={classes.container}>
      <img
        src={imgConstants.logo}
        height={100}
        width={100}
        className={classes.logo}
      />
      <Typography variant="h4" align="center" style={{ fontWeight: "bold" }}>
        Lấy lại mật khẩu
      </Typography>
      <Typography variant="body2" align="center" style={{ padding: "10px 0" }}>
        Nhập địa chỉ email liên kết với tài khoản của bạn và chúng tôi sẽ gửi
        link để tạo lại mật khẩu mới
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Email:"
          name="email"
          type="email"
          defaultValue=""
          register={register}
          autoComplete="email"
          require="true"
          autoFocus
          errors={errors.email}
        />
        <Typography align="right" color="error">
          {err}
        </Typography>
        {isLoading ? (
          <Loading/>
        ) : (
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className={classes.btnContinue}
          >
            Tiếp tục
          </Button>
        )}
      </form>
    </Grid>
  );
};

export default withStyles(style)(ForgotPassword);
