import { Typography, withStyles } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getNotification } from "redux/notification";
import NotificationItem from "../NotificationItem/NotificationItem";

import style from "./Style";

const NotificationList = (props) => {
  const { classes } = props;

  const [notificationList, setNotificationList] = useState([]);
  const dispatch = useDispatch();

  const data = [
    {
      user: "Lilly Hammond",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
    {
      user: "Gerald Mathis",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
    {
      user: "Cornelia Martin",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
    {
      user: "Mayme Obrien",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
    {
      user: "Derek Summers",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
    {
      user: "Lilly Hammond",
      content:
        "energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both",
    },
  ];

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getNotification());
      resp = unwrapResult(resp);
      console.log(resp)
      setNotificationList(resp);
    };

    fetchData();
  }, []);


  let renderList;
  if (notificationList) {
    renderList = notificationList.map((d, i) => {
      return <NotificationItem data={d} key={i} />;
    });
  }

  return (
    <div>
      <Typography className={classes.title}>Thông báo của bạn ({notificationList.length})</Typography>
      {notificationList ? (
        renderList
      ) : (
        <Typography align="center">Trống</Typography>
      )}
    </div>
  );
};

export default withStyles(style)(NotificationList);
