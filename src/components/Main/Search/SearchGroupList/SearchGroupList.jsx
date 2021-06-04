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

const SearchGroupList = (props) => {
  const { classes } = props;

  const data = [1, 2, 3, 4, 5, 6];

  let renderList = data.map((d, index) => {
    return (
      <Link to="#" className={classes.groupItem} key={index}>
        <ListItem className={classes.groupItemNested}>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>H</Avatar>
          </ListItemAvatar>
          <Box className={classes.groupInfo} ml={1}>
            <Box>
              <b className={classes.groupName}>KTPM 0117</b>
              <p className={classes.groupDesc}>Học tập</p>
            </Box>
            <Button variant="contained" className={classes.btnFollow}>
              Tham gia
            </Button>
          </Box>
        </ListItem>
      </Link>
    );
  });

  return <List className={classes.groupList}>{renderList}</List>;
};

export default withStyles(style)(SearchGroupList);
