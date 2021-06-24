import { Avatar, Box, Button, Dialog, Typography } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { unwrapResult } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getMembers, removeMember } from "redux/group";
import { toggleFollowUser, getUser } from "redux/user";

const style = {
  container: {
    display: "flex",
    margin: "15px auto",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    color: "white",
    cursor: "pointer",
  },
  btnMore: {
    cursor: "pointer",
    color: "#0099d4",
    marginLeft: 3,
  },
};

export default function GroupDetailMembers(props) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  let currentUser = useSelector((state) => state.user.currentUser);
  let group = useSelector((state) => state.group.groupDetail);
  let isRemove = useSelector((state) => state.group.isRemove);
  let isFollow = useSelector((state) => state.user.isFollow);
  let isJoin = useSelector((state) => state.message.isJoin);

  useEffect(() => {
    console.log(isJoin)
    let fetchData = async () => {
      let resp = await dispatch(getMembers(id));
      resp = unwrapResult(resp);
      setMembers(resp);
    };

    fetchData();
  }, [isRemove, isJoin]);
  useEffect(() =>{
    dispatch(getUser())
  }, [isFollow])

  const removeMem = (user) => {
    Swal.fire({
      title: "Xác nhận",
      text: `Bạn muốn mời ${user.full_name} ra khỏi nhóm`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mời ra",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          user_id: user._id,
          group_id: group._id,
        };
        dispatch(removeMember(data));
      }
    });
  };
  const followUser = async(user_id) => {
    dispatch(toggleFollowUser(user_id))
  };

  return (
    <div style={style.container}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <h4 style={{ textAlign: "center" }}>Tất cả thành viên</h4>
        {members.map((member, index) => {
          return (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={1}
              key={index}
            >
              <a href="">
                <Box display="flex" alignItems="center">
                  <Avatar
                    alt="Thành viên"
                    src={member.user[0].avatar}
                    style={style.avatar}
                  >
                    {member.user[0].full_name}
                  </Avatar>
                  <Box display="flex" flexDirection="column" pl={1}>
                    {member.user[0]._id === currentUser._id ? (
                      <b variant="bold">Bạn</b>
                    ) : (
                      <>
                        <b variant="bold">{member.user[0].full_name}</b>
                        <Typography color="textSecondary">
                          Đến từ {member.user[0].from}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </a>
              {member.user[0]._id !== currentUser._id && (
                <Box>
                  {!currentUser.following.includes(member.user[0]._id) ? (
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      style={{ textTransform: "initial" }}
                      onClick={() => followUser(member.user[0]._id)}
                    >
                      Theo dõi
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      style={{ textTransform: "initial" }}
                      onClick={() => followUser(member.user[0]._id)}
                    >
                      Bỏ theo dõi
                    </Button>
                  )}

                  {props.group !== member.user[0]._id && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="default"
                      style={{ textTransform: "initial", marginLeft: 5 }}
                      onClick={() => removeMem(member.user[0])}
                    >
                      Mời ra
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Dialog>
      <AvatarGroup max={8}>
        {members.map((member, index) => {
          return (
            <Avatar
              alt="Thành viên"
              src={member.user[0].avatar}
              style={style.avatar}
              key={index}
            >
              {member.user[0].full_name}
            </Avatar>
          );
        })}
      </AvatarGroup>
      <Typography style={style.btnMore} onClick={() => setOpen(true)}>
        Tất cả
      </Typography>
    </div>
  );
}
