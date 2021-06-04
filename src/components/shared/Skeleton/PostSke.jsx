import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Box, Grid, withStyles } from "@material-ui/core";

import style from "./Style";

const PostSke = (props) => {
  const { classes } = props;

  return (
    <Grid>
      <Box display="flex" alignItems="center">
        <Skeleton
          animation="wave"
          variant="circle"
          width={55}
          height={50}
          className={classes.skeAvatar}
        />
        <Box style={{width: '100%'}}>
          <Skeleton
            animation="wave"
            height={15}
            width="60%"
            style={{ marginBottom: 6 }}
          />
           <Skeleton
            animation="wave"
            height={10}
            width="30%"
            style={{ marginBottom: 6 }}
          />
        </Box>
      </Box>
      <Skeleton animation="wave" variant="rect" className={classes.skeMedia} />
    </Grid>
  );
};

export default withStyles(style)(PostSke);
