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

const NotificationItem = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const heartRel = useRef();
  const { classes } = props;
  const { data } = props;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Card className={classes.notifyItem}>
      {isLoading ? (
        <NotificationSke />
      ) : (
        <Link to="">
          <CardContent className={classes.cardBody}>
            <Avatar src="" className={classes.notifyAvatar}>
              {data.user}
            </Avatar>
            <div>
              <Link to="" className={classes.notifyUser}>
                {data.user}
              </Link>
              {data.content}
              <Typography className={classes.notifyAt}>10m ago</Typography>
            </div>
          </CardContent>
        </Link>
      )}
    </Card>
  );
};

export default withStyles(style)(NotificationItem);
