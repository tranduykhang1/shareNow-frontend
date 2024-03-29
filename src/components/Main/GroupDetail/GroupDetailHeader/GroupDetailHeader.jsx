import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";

import style from "./Style";
import { useParams } from "react-router";
import {
  addMember,
  checkUserIn,
  getGroupDetail,
  newsInGroup,
  removeGroupAction,
} from "redux/group";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import Icons from "constants/Icons/Icons";
import GroupForm from "components/Main/Group/GroupPage/GroupForm";
import Loading from "components/shared/Loading/Loading";
import Swal from "sweetalert2";

const GroupDetailHeader = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [group, setGroup] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();

  let background = "https://plus24h.com/upload/images/fb-groups.jpg";

  let currentUser = useSelector((state) => state.user.currentUser);
  let isUpload = useSelector((state) => state.group.uploadForm);
  let isJoin = useSelector((state) => state.group.isJoin);
  let isRemove = useSelector((state) => state.group.isRemove);
  let isCreatePost = useSelector((state) => state.group.isCreatePost);

  //

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getGroupDetail(id));
      resp = unwrapResult(resp);
      // setPassword(resp.password)
      setGroup(resp);
    };

    fetchData();
  }, [isUpload, isCreatePost]);

  useEffect(() => {
    if (isRemove) {
      window.location.href = "/groups";
    }
  }, [isRemove]);

  const joinGroup = async () => {
    setIsLoading(true);
    let data = {
      id: group._id,
      user: currentUser._id,
      password: password,
      type: "join",
    };
    let resp = await dispatch(addMember(data));
    setIsLoading(false);
    resp = unwrapResult(resp);
    console.log(resp);
    if (resp === "User was added!") {
      setIsLoading(false);
      setOpen(false);
    }
    if ("Password not match") {
      setError("Mật khẩu không khớp!");
    }
  };
  const removeGroup = async () => {
    Swal.fire({
      title: "Xác nhận",
      text: `Bạn muốn xóa nhóm này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeGroupAction(group._id));
      }
    });
  };
  const onLeaveGroup = () =>{
    Swal.fire({
      title: "Xác nhận",
      text: `Bạn muốn rời nhóm này?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(removeGroupAction(group._id));
      }
    });
  }

  const styles = {
    headerImage: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${
        group ? group.background : background
      } )`,
      backgroundSize: "cover",
      height:"25vh",
      width: "auto",
      borderRadius: 7,
    },
  };

  return group ? (
    <Grid className={classes.headerContainer}>
      <div style={styles.headerImage}></div>
      {currentUser._id === group.admin_key && (
        <>
          <Icons.StudentIcon
            className={classes.editIcon}
            onClick={() => setDrawer(!drawer)}
          />
          <Icons.TrashIcon
            className={classes.trashIcon}
            onClick={removeGroup}
          />
        </>
      )}
      <Grid container className={classes.groupInfo}>
        {isJoin && <Box position="absolute" display="flex" alignItems="center" style={{color: 'white', top: "-90%"}}>
           <h5>Mật khẩu nhóm:</h5><b style={{marginLeft: 5}}>{group.password}</b>
        </Box>}
        <div>
          <Typography className={classes.groupName}>{group.name}</Typography>
          <Typography className={classes.groupMember}>
            {group.members && group.members.length} thành viên
          </Typography>
        </div>
        {!isJoin ? (
          <Button
            variant="contained"
            className={classes.btnJoin}
            onClick={() => setOpen(true)}
          >
            Tham gia
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            className={classes.btnJoin}
            onClick={onLeaveGroup}
          >
            Rời nhóm
          </Button>
        )}
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            name="password"
            margin="dense"
            label="Mật khẩu nhóm:"
            value={password}
            type="text"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography color="error">{error}</Typography>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              color="primary"
              onClick={joinGroup}
              disabled={password ? false : true}
            >
              Tham gia
            </Button>
          )}
        </DialogActions>
      </Dialog>
      {group && <GroupForm drawer={drawer} group={group} />}
    </Grid>
  ) : (
    <Typography align="center" style={{ fontSize: "25px !important" }}>
      <Loading/>
    </Typography>
  );
};

export default withStyles(style)(GroupDetailHeader);
