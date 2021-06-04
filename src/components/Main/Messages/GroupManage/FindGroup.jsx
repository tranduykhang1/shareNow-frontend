import React from "react";
import { Fade, Paper, withStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";

import style from "./Style";

const FindGroup = (props) => {
  const { classes } = props;
  let { isFind } = props;

  const {register, handleSubmit} = useForm()

  const onSubmit = data =>{
    console.log(data)
  }
  return (
    <div className={classes.createGroupContainer}>
      <Fade in={isFind}>
        <Paper elevation={4} className={classes.paper}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.createForm}
          >
            <input
              name="group_name"
              type="text"
              className={classes.input}
              placeholder="Tìm nhóm mới..."
              require="true"
              ref={register}
            />
          </form>
        </Paper>
      </Fade>
    </div>
  );
};

export default withStyles(style)(FindGroup);
