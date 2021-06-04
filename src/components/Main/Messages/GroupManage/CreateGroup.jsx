import {Fade, Paper, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import React from "react";
import { useForm } from "react-hook-form";

import style from "./Style";

const CreateGroup = (props) => {
  const { classes } = props;
  let { isCreate } = props;

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <div className={classes.createGroupContainer}>
      <Fade in={isCreate}>
        <Paper elevation={4} className={classes.paper}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.createForm}
          >
            <input
              name="group_name"
              type="text"
              className={classes.input}
              placeholder="Tạo nhóm mới .."
              require="true"
              ref={register}
            />
            <button type="submit" size="small" className={classes.btnCreate}>
              <Icons.ArrowRightIcon className={classes.createIcon} />
            </button>
          </form>
        </Paper>
      </Fade>
    </div>
  );
};

export default withStyles(style)(CreateGroup);
