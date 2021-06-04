import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import style from "./Style";
import Loading from "components/shared/Loading/Loading";
import CustomInput from "../Input/CustomInput";
import CustomSelect from "../Input/CustomSelect";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";

import { getIndustries, getDepartments } from "redux/theCurriculum";
import { activeUser } from "redux/user";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  department: yup.string().required("Bạn chưa nhập trường này"),
  industry: yup.string().required("Bạn chưa nhập trường này"),
  course: yup.string().required("Bạn chưa nhập trường này"),
  class_room: yup.string().required("Bạn chưa nhập trường này"),
  student_type: yup.string().required("Bạn chưa nhập trường này"),
  student_code: yup.string().required("Bạn chưa nhập trường này"),
});

const ConfirmUserForm = (props) => {
  const { url } = useRouteMatch();
  const { classes } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      department: "",
      industry: "",
      gender: "",
      student_type: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [value, setValue] = useState("");

  let currentUser = useSelector((state) => state.user.currentUser);
  let departmentList = useSelector((state) => state.theCurriculum.departments);
  let industryList = useSelector((state) => state.theCurriculum.industries);
  let isActive = useSelector((state) => state.user.isActive);

  useEffect(() => {
    dispatch(getDepartments());
    dispatch(getIndustries());
  }, []);

  useEffect(() => {
    if (currentUser.state && !currentUser.state.active) {
      setOpen(true);
    }
  }, [currentUser]);
  useEffect(() => {
    if (isActive) {
      setOpen(false);
    }
  }, [isActive]);

  const genderOption = [
    { name: "Nam", _id: 1 },
    { name: "Nữ", _id: -1 },
  ];
  const studentTypeOption = [
    { name: "Là sinh viên", _id: "STUDENT" },
    { name: "Đã ra trường", _id: "OLD_STUDENT" },
  ];

  const onChange = (e) => {
    // setValue(e.target.value);
  };
  const onSubmit = (data) => {
    dispatch(activeUser(data));
  };

  return (
    <Dialog open={open}>
      <h3 className={classes.title}>
        Đầu tiên, hãy cho người biết rõ hơn về bạn bằng cách điền thông tin bên
        dưới.
      </h3>
      <Box p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" justifyContent="space-between">
            <CustomSelect
              id="department"
              name="department"
              require="true"
              label="Khoa:"
              register={register}
              onChange={onChange}
              options={departmentList}
              errors={errors.department}
            />
            <CustomSelect
              id="industry"
              name="industry"
              require="true"
              label="Ngành:"
              register={register}
              onChange={onChange}
              options={industryList}
              require="true"
              errors={errors.industry}
            />
          </Box>

          <CustomInput
            label="Khóa:"
            name="course"
            type="number"
            defaultValue=""
            register={register}
            autoComplete="email"
            require="true"
            errors={errors.course}
          />
          <CustomInput
            label="Lớp:"
            name="class_room"
            type="text"
            defaultValue=""
            register={register}
            autoComplete="email"
            require="true"
            errors={errors.class_room}
          />
          <CustomInput
            label="MSSV:"
            name="student_code"
            type="number"
            defaultValue=""
            register={register}
            autoComplete="email"
            require="true"
            errors={errors.student_code}
          />

          <Box display="flex" justifyContent="space-between">
            <CustomSelect
              id="gender"
              name="gender"
              require="true"
              label="Bạn là: "
              register={register}
              onChange={onChange}
              options={genderOption}
              require="true"
            />
            <CustomSelect
              id="student_type"
              name="student_type"
              require="true"
              label="Bạn đang là sinh viên?"
              register={register}
              onChange={onChange}
              options={studentTypeOption}
              require="true"
              errors={errors.student_type}
            />
          </Box>
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
              Tiếp tục
            </Button>
          )}
        </form>
      </Box>
    </Dialog>
  );
};

export default withStyles(style)(ConfirmUserForm);
