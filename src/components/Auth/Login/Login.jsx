import {
  Button,
  FormControl,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { GoogleLogin } from "react-google-login";
import images from "constants/Images/images";
import CustomInput from "components/shared/Input/CustomInput";
import style from "./Login.style";
import Loading from "components/shared/Loading/Loading";
//store
import { googleLogin, loginAction } from "redux/auth";
import { unwrapResult } from "@reduxjs/toolkit";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn chưa nhập trường này"),
  password: yup
    .string()
    .required("Bạn chưa nhập trường này")
    .min(6, "Mật khẩu ít nhất 6 kí tự"),
});

const Login = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState({
    type: "",
    msg: "",
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const responseGoogle = async (res) => {
    if (!res.error) {
      setIsLoading(true);
      if (!isLoading) {
        const resp = await dispatch(googleLogin(res));
        const response = unwrapResult(resp);
        setIsLoading(false);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.pathname = "/";
      }
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    const resp = await dispatch(loginAction(data));
    const response = unwrapResult(resp);
    setIsLoading(false);
    if (response) {
      if (response.data === "Password incorrect") {
        setLoginState({
          type: "password",
          msg: "Mật khẩu không đúng",
        });
      } else if (response.data === "Email not Found") {
        setLoginState({
          type: "username",
          msg: "Không tìm thấy Email",
        });
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.pathname = "/";
      }
    }
  };

  return (
    <Grid item xs={4} className={classes.loginContainer}>
      <img className={classes.logo} src={images.logo} />
      <Typography variant="h4" align="center" style={{ fontWeight: "bold" }}>
        Đăng nhập
      </Typography>
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
      {/* google login button */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Email (username):"
          name="email"
          type="text"
          defaultValue=""
          register={register}
          autoComplete="email"
          require="true"
          errors={errors.email}
        />
        {loginState.type === "username" && (
          <Typography color="error" align="right">
            {loginState.msg}
          </Typography>
        )}
        <CustomInput
          label="Password:"
          name="password"
          type="password"
          defaultValue=""
          register={register}
          autoComplete="password"
          require="true"
          errors={errors.password}
        />
        {loginState.type === "password" && (
          <Typography color="error" align="right">
            {loginState.msg}
          </Typography>
        )}
        {isLoading ? (
          <Loading />
        ) : (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            className={classes.btn}
          >
            Đăng nhập
          </Button>
        )}
      </form>

      <Grid container item justify="space-between" style={{ marginTop: 3 }}>
        <Link to="/register" className={classes.join_now}>
          <Typography variant="body2" align="center">
            Gia nhập ngay
          </Typography>
        </Link>

        <Link to="/forgot-password" className={classes.forgot_password}>
          <Typography variant="body2" align="center">
            Quên mật khẩu?
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(Login);
