import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import CustomInput from "components/shared/Input/CustomInput";
import imgConstant from "constants/Images/images";
import style from "./Register.style";
import { removeVietnameseTones } from "assets/Config/removeVietnameseTones";
import Loading from "components/shared/Loading/Loading";
//action
import { unwrapResult } from "@reduxjs/toolkit";
import { registerAction } from "redux/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn chưa nhập trường này"),
  full_name: yup.string().required("Bạn chưa nhập trường này"),
  username: yup.string().required("Bạn chưa nhập trường này"),
  password: yup
    .string()
    .required("Bạn chưa nhập trường này")
    .min(6, "Mật khẩu ít nhất 6 kí tự"),
  confirm_password: yup
    .string()
    .required("Bạn chưa nhập trường này")
    .min(6, "Mật khẩu ít nhất 6 kí tự")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const Register = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [registerError, setRegisterError] = useState("");
  const [sampleUsername, setSampleUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const recommendUsername = (e) => {
    let name = e.target.value;
    let newName = name.replace(/ /g, "");
    newName = removeVietnameseTones(newName);
    setSampleUsername("VD: " + newName.toLowerCase());
  };
  const responseGoogle = (res) => {
    console.log(res);
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    let response = await dispatch(registerAction(data));
    response = unwrapResult(response);
    setIsLoading(false);
    if (response.data === "Email have already") {
      setRegisterError("Email đã tồn tại");
    } else {
      history.push("/email-confirm");
    }
  };

  return (
    <Grid container className={classes.registerContainer}>
      <Grid item={true} className={classes.leftSide} md={5} sm={false}>
        <Grid className={classes.sloganTitle}>
          <h3 style={{ color: "#0478B9" }}>shareNow,</h3>
          <Typography display="inline" variant="h4" style={{ color: "white" }}>
            Cộng đồng kết nối và chia sẻ
          </Typography>
        </Grid>
        <Grid className={classes.sloganText}>
          <Typography variant="subtitle1" style={{ color: "white" }}>
            Gia nhập ngay bây giờ để có thể kết nối đến bạn bè xung quanh bạn
          </Typography>
        </Grid>
        <Link to="/login">
          <Button variant="contained" className={classes.btnLogin}>
            Đăng nhập
          </Button>
        </Link>
        <Typography color="textSecondary" className={classes.copyRight}>
          tranduykhang-kpm0117
        </Typography>
      </Grid>
      <Grid item={true} className={classes.rightSide} md={7} sm={12}>
        <Grid>
          <img src={imgConstant.logo} className={classes.logo} />
          <h3 align="center" style={{ fontWeight: "bold" }}>
            Gia nhập ngay
          </h3>
        </Grid>
        <Grid item={true} sm={6} className={classes.registerForm}>
          <GoogleLogin
            buttonText="Đăng nhập với Email"
            className={classes.btnGoogleLogin}
            clientId="183749103002-l64itvh82djkou6tfq1cq1qdvp526vr2.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <Typography variant="body1" align="center">
            Hoặc
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              label="Email (Username):"
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
              {registerError}
            </Typography>
            <CustomInput
              label="Họ tên:"
              name="full_name"
              type="text"
              defaultValue=""
              register={register}
              autoComplete="full_name"
              require="true"
              errors={errors.full_name}
              onChange={recommendUsername}
            />
            <CustomInput
              label="Tên người dùng:"
              name="username"
              type="text"
              defaultValue=""
              register={register}
              autoComplete="username"
              require="true"
              errors={errors.username}
              placeholder={sampleUsername}
            />
            <CustomInput
              label="Mật khẩu:"
              name="password"
              type="password"
              defaultValue=""
              register={register}
              autoComplete="password"
              require="true"
              errors={errors.password}
            />
            <CustomInput
              label="Nhập lại mật khẩu:"
              name="confirm_password"
              type="password"
              defaultValue=""
              register={register}
              autoComplete="confirm_password"
              require="true"
              errors={errors.confirm_password}
            />

            {isLoading ? (
              <Loading />
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
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Register);
