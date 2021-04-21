import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

const CustomInput = (props) => {
  const { className,register, id, label, errors, ...inputProps } = props;
  console.log(className)
  return (
    <Grid style={{ marginBottom: 5 }}>
      <Typography variant="body1" htmlFor={id} margin={10}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        inputRef={register}
        id={id}
        {...inputProps}
      />
      {errors && (
        <Typography variant="body2" color="error">
          * {errors.message}
        </Typography>
      )}
    </Grid>
  );
};

export default CustomInput;
