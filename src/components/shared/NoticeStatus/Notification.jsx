import { Avatar, Box, Grow, Paper, Slide } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const style = {
  container: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: 1000,
  },
  slide: {
    padding: "10px 15px",
    // backgroundColor: 'blue'
  },
  avatar: {
    color: "grey",
    border: "1px solid gray",
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "15px !important",
  },
  time: {
    color: "grey",
    fontSize: 11,
  },
};

export default function Notification() {
  const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState({
    _id: "/message",
    title: "",
    text: "sdfsdfsfsdf sf sdfs d fsd fsd f",
    time: "",
    avatar: "",
  });

  let isFollowing = useSelector((state) => state.user.isFollowing);

  useEffect(() => {
    if (isFollowing > 0) {
      setChecked(true);
      setNotification({...notification, text: "Sau khi theo dõi các bạn có thể trò chuyện."})
    }

    setTimeout(() => {
      setChecked(false);
    }, 9000);
  }, [isFollowing]);

  return (
    <div style={style.container}>
      {" "}
      <Slide direction="left" in={checked}>
        <Paper elevation={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            {notification.avatar && <Avatar style={style.avatar}>Hello</Avatar>}
            <Box display="flex" flexDirection="column" pl={1}>
              <span style={style.content}>{notification.text}</span>
              <i style={style.time}>6:00</i>
            </Box>
          </Box>
        </Paper>
      </Slide>
    </div>
  );
}
