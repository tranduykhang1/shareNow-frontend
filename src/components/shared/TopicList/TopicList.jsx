import {
  Box,
  Collapse,
  Grid,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import {
  ContactSupportOutlined,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import Icons from "constants/Icons/Icons.js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPost } from "redux/post.js";
import { currentTopic, getDepartments } from "redux/theCurriculum";
import { getTotalUser } from "redux/user.js";

import style from "./Style.js";

const TopicList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const [topicList, setTopicList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [activeId, setActiveId] = useState();
  const [isDispatch, setIsDispatch] = useState(false);
  const [totalUser, setTotalUser] = useState({});

  let isActiveItem = false;
  const topics = useSelector((state) => state.theCurriculum.departments);
  const tag = useSelector((state) => state.theCurriculum.currentTag);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getTotalUser());
      resp = unwrapResult(resp);
      setTotalUser(resp);
    };

    fetchData();
  }, []);
  const handleClick = () => {
    setOpen(!open);
  };
  const toggleActive = (data) => {
    if (data) {
      setIsActive(false);
      return;
    }
    setActiveId();
    return setIsActive(true);
  };

  const filterTopic = (topic) => {
    window.scrollTo(0, 0);
    setIsDispatch(true);
    setActiveId(topic);
    setIsActive(false);
    if (activeId === topic) {
      setActiveId("");
    } else {
      setActiveId(topic);
    }
  };

  useEffect(() => {
    if (isDispatch) {
      dispatch(currentTopic(activeId));
      let data = {
        topic: activeId,
        tag: tag,
      };
      dispatch(filterPost(data));
    }
  }, [activeId]);

  let renderTopics = topics.map((topic, index) => {
    isActiveItem = topic._id === activeId;
    if (topic.alias !== "OLD_STUDENT") {
      return (
        <ListItem
          button
          onClick={() => filterTopic(topic._id)}
          key={index}
          className={isActiveItem && classes.active}
        >
          {/* <topic.icon
            className={isActiveItem ? classes.iconActive : classes.icon}
          /> */}
          <Typography
            className={isActiveItem ? classes.textActive : classes.textItem}
          >
            {topic.name}
          </Typography>
        </ListItem>
      );
    }
  });
  return (
    <Hidden smDown>
      <Grid className={classes.topicContainer}>
        <div className={classes.listHeader}>
          <Typography className={classes.headerText}>Bài viết theo</Typography>
        </div>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className={classes.topicList}
        >
          <ListItem
            button
            className={!isActive ? classes.listItem : classes.listItemActive}
            onClick={() => toggleActive(false)}
          >
            <Icons.OldStudentIcon
              className={!isActive ? classes.listIcon : classes.listIconActive}
            />
            <Typography
              className={!isActive ? classes.listText : classes.listTextActive}
            >
              Đã ra trường
            </Typography>
          </ListItem>
          <ListItem button onClick={handleClick} className={classes.listItem}>
            <Icons.StudentIcon className={classes.listIcon} />
            <Typography className={classes.listText}>
              Đang là sinh viên
            </Typography>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={classes.subList}>
              {renderTopics}
            </List>
          </Collapse>
        </List>

        <Box className={classes.statistic}>
          <Box display="flex">
            <Icons.ChartIcon className={classes.totalIcon} />
            <h5>Tham gia: {totalUser.total}</h5>
          </Box>
          <Box display="flex">
            <Icons.ChartIcon className={classes.onlineIcon} />
            <h5>Đang truy cập: {totalUser.online}</h5>
          </Box>
        </Box>
      </Grid>
    </Hidden>
  );
};
export default withStyles(style)(TopicList);
