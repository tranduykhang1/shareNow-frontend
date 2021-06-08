import { Grid, Hidden, Typography, withStyles } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPost } from "redux/post.js";
import { currentTag, getTagList } from "redux/theCurriculum.js";

import styles from "./Style.js";

function TagList(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState();
  const [tagList, setTagList] = useState([]);
  const [color, setColor] = useState("#337ab7");
  const [isDispatch, setIsDispatch] = useState(false)


  const topic = useSelector((state) => state.theCurriculum.currentTopic);

  useEffect(() => {
    let fetchData = async () => {
      let resp = await dispatch(getTagList());
      resp = unwrapResult(resp);
      setTagList(resp);
    };

    fetchData();
  }, []);

  const getPostList = (tag) => {
    setIsDispatch(true)
    if (activeId === tag._id) {
      setActiveId("");
    } else {
      setActiveId(tag._id);
    }
  };
  useEffect(() => {
    if (isDispatch) {
      dispatch(currentTag(activeId));
      let data = {
        tag: activeId,
        topic: topic,
      };
      dispatch(filterPost(data));
    }
  }, [activeId]);

  let renderTag;
  if (tagList) {
    renderTag = tagList.map((tag, index) => {
      return (
        <li
          key={index}
          onClick={() => getPostList(tag)}
          className={classes.tagItem}
          style={{ background: activeId !== tag._id ? color : "#013563" }}
        >
          {tag.name}
        </li>
      );
    });
  }

  return (
    <div className={classes.container}>
      <ul className={classes.tagList}>{renderTag}</ul>
    </div>
  );
}

export default withStyles(styles)(TagList);
