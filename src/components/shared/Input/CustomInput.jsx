import { Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

const CustomInput = (props) => {
  const { className, register, id, label, errors, ...inputProps } = props;
  return (
    <Grid style={{ marginBottom: 5 }}>
      <label htmlFor={id} margin={10} style={{fontSize: '13px !important', fontWeight: 'normal'}}>
        {label}
      </label>
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
