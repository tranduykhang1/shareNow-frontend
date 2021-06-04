import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";

import style from "./Style";

const CustomSelect = (props) => {
  const { classes } = props;
  const { register,defaultValue, label, id, errors, options, ...inputProps } = props;

  return (
    <Grid className={classes.selectWrapper}>
      <label htmlFor={id} className={classes.selectLabel}>
        {label}
      </label>
      <select
        className={classes.select}
        ref={register}
        select
        id={id}
        value={defaultValue}
        {...inputProps}
      >
        <option disabled value="">
          --Chọn--
        </option>
        {options.map((option, index) => (
          <option className={classes.option} key={index} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {errors && (
        <Typography variant="body2" color="error">
          * {errors.message}
        </Typography>
      )}
    </Grid>
  );
};

export default withStyles(style)(CustomSelect);
