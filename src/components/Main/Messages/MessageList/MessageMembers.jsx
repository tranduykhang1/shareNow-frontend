import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { leaveRoom } from "redux/message";
import Swal from "sweetalert2";

export default function MessageMembers({ open }) {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();

  const roomMembers = useSelector((state) => state.message.roomMembers);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userMessage = useSelector((state) => state.message.userMessage);

  useEffect(() => {
    setIsOpen(!isOpen);
  }, [open]);

  const onLeave = (user) => {
    Swal.fire({
      title: "Xác nhận",
      html: `Bạn muốn mời <b>${user.full_name}</b> ra khỏi phòng?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Mời ra",
      cancelButtonText: "Không",
    }).then((result) => {
      let data = {
        room_code: userMessage[0]._id,
        user: user._id,
      };
      dispatch(leaveRoom(data));
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <DialogTitle style={{ fontWeight: "bold" }}>
          Thành viên trong nhóm
        </DialogTitle>
        <Divider></Divider>
        <DialogContent>
          <List>
            {roomMembers.map((member, index) => {
              return (
                <ListItem key={index} style={{ color: "black" }}>
                  <ListItemAvatar>
                    <Avatar src={member.users[0].avatar}>
                      {member.users[0].full_name.split("")[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={member.users[0].full_name}
                    secondary={member.users[0].class_room}
                  />
                  {currentUser._id === member.userId ? (
                    <h6>Bạn</h6>
                  ) : (
                    userMessage &&
                    currentUser._id === userMessage[0].admin_key && (
                      <Button
                        size="small"
                        variant="contained"
                        color="secondary"
                        style={{ textTransform: "initial" }}
                        onClick={() => onLeave(member.users[0])}
                      >
                        Mời ra
                      </Button>
                    )
                  )}
                  {currentUser._id !== member.userId && (
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        textTransform: "initial",
                        marginLeft: 3,
                        color: "black !important",
                      }}
                    >
                      Xem trang
                    </Button>
                  )}
                </ListItem>
              );
            })}
          </List>
        </DialogContent>
      </DialogContent>
    </Dialog>
  );
}
