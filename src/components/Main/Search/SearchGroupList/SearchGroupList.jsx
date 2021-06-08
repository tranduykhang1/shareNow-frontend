import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import Loading from "components/shared/Loading/Loading";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addMember, groupByUser } from "redux/group";

import style from "./Style";

const SearchGroupList = (props) => {
  const { classes, groups } = props;
  const dispatch = useDispatch();

  const [group, setGroup] = useState({
    id: "",
    user: "",
    password: "",
    type: "join",
  });
  const [password, setPassword] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  const currentUser = useSelector((state) => state.user.currentUser);

  const join = (id) => {
    setGroup({ ...group, id: id, user: currentUser._id });
    setOpen(true)
  };
  const onChange = (e) => {
    setGroup({ ...group, password: e.target.value });
  };
  const joinGroup = async () => {
    setIsLoading(true);
    let resp = await dispatch(addMember(group));
    setIsLoading(false);
    resp = unwrapResult(resp);
    console.log(resp);
    if (resp === "User was added!") {
      setIsLoading(false);
      setOpen(false);
      history.push(`/group/${group.id}`)
    }
    if ("Password not match") {
      setError("Mật khẩu không khớp!");
    }
  };

  let renderList = groups.map((group, index) => {
    return (
      <ListItem className={classes.groupItemNested} key={index}>
        <Link to={`/group/${group._id}`} className={classes.groupItem}>
          <ListItemAvatar>
            <Avatar className={classes.avatar} src={group.background}>
              {group.name.split("")[0]}
            </Avatar>
          </ListItemAvatar>
        </Link>
        <Box className={classes.groupInfo} ml={1}>
          <Box>
            <b className={classes.groupName}>{group.name}</b>
            <p className={classes.groupDesc}>
              {group.tag[0].name} - {group.members.length} người tham gia
            </p>
          </Box>
          {!group.members.includes(currentUser._id) ? (
            <Button
              variant="contained"
              className={classes.btnFollow}
              onClick={() => join(group._id)}
            >
              Tham gia
            </Button>
          ) : (
            "Đã tham gia"
          )}
        </Box>
      </ListItem>
    );
  });

  return (
    <List className={classes.groupList}>
      {renderList}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            name="password"
            margin="dense"
            label="Mật khẩu nhóm:"
            value={group.password}
            type="text"
            fullWidth
            onChange={onChange}
          />
          <Typography color="error">{error}</Typography>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              color="primary"
              onClick={joinGroup}
              disabled={group.password ? false : true}
            >
              Tham gia
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </List>
  );
};

export default withStyles(style)(SearchGroupList);
