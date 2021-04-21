import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomInput from "components/shared/Input/CustomInput";
import images from "constants/Images/images";
import style from "./UpdatePassword.style";

const schema = yup.object().shape({
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

const UpdatePassword = (props) => {
  const { classes } = props;
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid item xs={4} className={classes.container}>
      <img className={classes.logo} src={images.logo} />
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", paddingBottom: 20 }}
      >
        Cập nhập mật khẩu
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomInput
          label="Mật khẩu mới:"
          name="password"
          type="password"
          defaultValue=""
          register={register}
          require="true"
          autoFocus
          errors={errors.password}
        />
        <CustomInput
          label="Nhập lại mật khẩu mới:"
          name="confirm_password"
          type="password"
          defaultValue=""
          register={register}
          autoComplete="password"
          require="true"
          errors={errors.confirm_password}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          type="submit"
          className={classes.btnContinue}
        >
          Tiếp tục
        </Button>
      </form>
    </Grid>
  );
};

export default withStyles(style)(UpdatePassword);
