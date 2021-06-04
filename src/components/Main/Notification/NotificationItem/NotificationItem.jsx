import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  withStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import style from "./Style";
import NotificationSke from "components/shared/Skeleton/NotificationSke";
import Moment from "react-moment";

const NotificationItem = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(true);
  const { classes } = props;
  const { data } = props;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);

    switch (data.notification_list.type) {
      case "follow":
        setUrl("/profile");
      case "like":
        setUrl("/post");
      case "comment":
        setUrl("/post");
      default:
        setUrl("/notification");
    }
  }, []);

  return (
    <Card className={classes.notifyItem}>
      {isLoading ? (
        <NotificationSke />
      ) : (
        <Link to={`${url}/`}>
          <CardContent className={classes.cardBody}>
            <Avatar src={data.users[0].avatar} className={classes.notifyAvatar}>
              {data.users[0].full_name[0]}
            </Avatar>
            <div>
              <Link
                to={`/profile/${data.users[0]._id}`}
                className={classes.notifyUser}
              >
                {data.users[0].full_name}
              </Link>
              {data.notification_list.body}
              <Typography className={classes.notifyAt}>
                {" "}
                <Moment fromNow ago>
                  {data.notification_list.create_at}
                </Moment>
              </Typography>
            </div>
          </CardContent>
        </Link>
      )}
    </Card>
  );
};

export default withStyles(style)(NotificationItem);
