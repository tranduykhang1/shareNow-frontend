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
import { joinRoom } from "redux/message";

const style = {
  link: {
    color: "black !important",
  },
  list: {
    paddingTop: "0 !important",
  },
  listItem: {
    padding: "0 !important",
    color: "black !important",
  },
  btnInvite: {
    textTransform: "initial",
  },
};

export default function InviteMembers({ open }) {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsOpen(!isOpen);
  }, [open]);

  const followingList = useSelector((state) => state.user.followingList);
  const roomMessage = useSelector((state) => state.message.userMessage);

  const inviteMember = (id) => {
    let { room_code } = roomMessage[0];
    let data = {
      room_code: room_code,
      userId: id,
    };
    dispatch(joinRoom(data));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle style={{ fontWeight: "bold !important" }}>
        Danh sách bạn có thể mời
      </DialogTitle>
      <Divider></Divider>
      <DialogContent>
        <List style={style.list}>
          {followingList &&
            followingList.map((user, index) => {
              return (
                <ListItem key={index} style={{ color: "black" }} key={index}>
                  <Link to={`/profile/${user.users[0]._id}`} style={style.link}>
                    <ListItemAvatar>
                      <Avatar src={user.users[0].avatar}>
                        {user.users[0].full_name.split("")[0]}
                      </Avatar>
                    </ListItemAvatar>
                  </Link>
                  <ListItemText
                    primary={user.users[0].full_name}
                    secondary={user.users[0].class_room}
                  />
                  {roomMessage[0].members &&
                  !roomMessage[0].members.includes(user.users[0]._id) ? (
                    <Button
                      size="small"
                      variant="contained"
                      style={style.btnInvite}
                      onClick={() => inviteMember(user.users[0]._id)}
                    >
                      Mời
                    </Button>
                  ) : (
                    "Đang trong phòng"
                  )}
                </ListItem>
              );
            })}
        </List>
      </DialogContent>
    </Dialog>
  );
}
