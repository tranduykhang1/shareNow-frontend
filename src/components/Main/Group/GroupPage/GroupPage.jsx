import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, SwipeableDrawer, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import CustomInput from "components/shared/Input/CustomInput";
import PostItems from "components/shared/Post/PostItems/PostItems";

const style = {
  container: {
    marginLeft: "21.5%",
    padding: "0 80px",
  },
  btnToggle: {
    marginTop: 10,
    border: "1px solid #0478b9eb",
    color: "#0478b9eb",
  },
  createForm: {
    width: "30%",
    margin: "20px auto",
  },
  formTitle: {
    marginTop: 20,
    fontWeight: "bold",
    fontSize: "20px !important",
  },
  btnCreate: {
    marginTop: 10,
    background: "#e2e9ff",
    textTransform: 'initial'
  }
};

const schema = yup.object().shape({
  groupName: yup.string().required("Bạn chưa nhập tên nhóm"),
});

const GroupPage = (props) => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  const [drawer, setDrawer] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const toggleDrawer = (state) => {
    setDrawer(state);
  };
  const createGroup = (data) => {
    console.log(data);
  };

  const renderItems = data.map((data, i) => {
    return <PostItems key={i} />;
  });

  return (
    <Grid item sm={12} md={6} style={style.container}>
      <Grid>
        <Typography className="group-title">Các bài đăng trong nhóm</Typography>
        <div>
          <Button
            fullWidth
            style={style.btnToggle}
            onClick={() => toggleDrawer(true)}
          >
            Tạo nhóm mới
          </Button>
          <SwipeableDrawer
            anchor="top"
            open={drawer}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
          >
            <Typography align="center" style={style.formTitle}>
              Tạo nhóm
            </Typography>
            <form style={style.createForm} onSubmit={handleSubmit(createGroup)}>
              <CustomInput
                label="Tên nhóm: "
                name="groupName"
                type="text"
                defaultValue=""
                register={register}
                autoComplete="off"
                require="true"
                errors={errors.groupName}
              />
              <Typography color="textSecondary" align="center">Mặc định nhóm này là riêng tư</Typography>
              <Button type="submit"variant="outlined" color="primary" style={style.btnCreate} fullWidth>
                Tiếp theo
              </Button>
            </form>
          </SwipeableDrawer>
        </div>
      </Grid>
      {renderItems}
    </Grid>
  );
};
export default GroupPage;
