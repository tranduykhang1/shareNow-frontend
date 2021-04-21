import { Button, Grid, Typography, withStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

import imgConstants from "constants/Images/images.js";
import style from "./ForgotPassword.style";
import CustomInput from "components/shared/Input/CustomInput";


const schema = yup.object().shape({
email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bạn chưa nhập trường này"),
});

const ForgotPassword = (props) => {
  const { classes } = props;
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  return (
    <Grid md={4} sm={6} className={classes.container}>
      <img
        src={imgConstants.logo}
        height={100}
        width={100}
        className={classes.logo}
      />
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold" }}
        >
        Lấy lại mật khẩu
      </Typography>
      <Typography variant="body2" align="center" style={{padding: '10px 0'}}>
        Nhập địa chỉ email liên kết với tài khoản của bạn và chúng tôi sẽ gửi
        link để tạo lại mật khẩu mới
      </Typography>
      <form>
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className={classes.btnContinue}
        >
          Tiếp tục
        </Button>
      </form>
    </Grid>
  );
};

export default withStyles(style)(ForgotPassword);
