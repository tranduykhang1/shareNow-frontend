import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

import style from "./Style";

const SearchUserList = (props) => {
  const { classes } = props;

  const data = [1, 2, 3, 4, 5, 6];

  let renderList = data.map((d, index) => {
    return (
      <Link to="#" className={classes.userItem} key={index}>
        <ListItem className={classes.userItemNested}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>H</Avatar>
          </ListItemAvatar>
          <Box className={classes.userInfo} ml={1}>
            <Box>
              <b>Nguyen Van A</b>
              <h6>KTPM - K5</h6>
            </Box>
            <Button variant="contained" className={classes.btnFollow}>Theo dõi</Button>
          </Box>
        </ListItem>
      </Link>
    );
  });

  return <List className={classes.userList}>{renderList}</List>;
};

export default withStyles(style)(SearchUserList);
