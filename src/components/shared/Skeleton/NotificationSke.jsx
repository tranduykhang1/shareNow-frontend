import { Box, withStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

import style from "./Style";

const NotificationSke = (props) => {
  const { classes } = props;

  return (
    <div>
      <Box display="flex" alignItems="center" m={2}>
        <Skeleton
          animation="wave"
          variant="circle"
          width={55}
          height={50}
          className={classes.skeAvatar}
        />
        <div style={{ width: "100%" }}>
          <Skeleton
            animation="wave"
            height={15}
            width="80%"
            style={{ marginBottom: 6 }}
          />
          <Skeleton
            animation="wave"
            height={10}
            width="60%"
            style={{ marginBottom: 6 }}
          />
        </div>
      </Box>
    </div>
  );
};

export default withStyles(style)(NotificationSke);
