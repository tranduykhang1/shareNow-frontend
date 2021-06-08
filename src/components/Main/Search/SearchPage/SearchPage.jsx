import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography,
  withStyles,
} from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import Icons from "constants/Icons/Icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchGroup, searchUser } from "redux/search";
import { getTagList } from "redux/theCurriculum";
import SearchGroupList from "../SearchGroupList/SearchGroupList";
import SearchUserList from "../SearchUserList/SearchUserList";

import style from "./Style";
const SearchPage = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [showOption, setShowOption] = useState(false);
  const [optionId, setOptionId] = useState();
  const [searchQuery, setSearchQuery] = useState({
    query: "",
    department: "",
    topic: "",
  });
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const topicList = useSelector((state) => state.theCurriculum.departments);
  const tagList = useSelector((state) => state.theCurriculum.tagList);

  useEffect(() => {
    dispatch(getTagList());
  }, []);

  useEffect(() => {
    let fetchData = async () => {
      if (optionId === 0) {
        let resp = await dispatch(searchUser(searchQuery));
        resp = unwrapResult(resp);
        setUserList(resp);
        setGroupList([]);
      }
      if (optionId === 1) {
        let resp = await dispatch(searchGroup(searchQuery));
        resp = unwrapResult(resp);
        setGroupList(resp);
        setUserList([]);
      }
    };

    fetchData();
  }, [optionId, searchQuery]);


  const options = [
    {
      id: 0,
      icon: Icons.PersonIcon,
      text: "Người dùng",
    },
    {
      id: 1,
      icon: Icons.Group,
      text: "Nhóm",
    },
  ];

  const search = (e) => {
    e.preventDefault();
    setShowOption(true);
  };
  const onChange = async (e) => {
    let { name, value } = e.target;
    if (!searchQuery.query) {
      setOptionId(0);
    }
    setSearchQuery({ ...searchQuery, [name]: value });
    setShowOption(true);
  };

  let style = {
    marginLeft: "21.5%",
    padding: "0 40px",
  };

  return (
    <Grid item sm={12} md={6} style={style} className="responsiveGrid">
      <form className={classes.searchForm} onSubmit={search}>
        <Icons.SearchIcon className={classes.searchIcon} />
        <input
          name="query"
          type="text"
          className={classes.searchInput}
          placeholder="Tìm kiếm..."
          onChange={onChange}
          autocomplete="off"
        />
        {optionId === 0 ? (
          <select
            id="demo-customized-s-native"
            value=""
            name="department"
            style={{
              width: "50%",
              background: "transparent",
              padding: 10,
              border: "none",
            }}
            onChange={onChange}
          >
            <option disabled value="">
              Lọc theo khoa
            </option>
            {topicList.map((topic, index) => {
              return (
                <option key={index} value={topic._id}>
                  {topic.name}
                </option>
              );
            })}
            <option value="" style={{ fontWeight: "bold" }}>
              Đã ra trường
            </option>
          </select>
        ) : (
          optionId === 1 && (
            <select
              name="topic"
              id="demo-customized-s-native"
              value=""
              style={{
                width: "50%",
                background: "transparent",
                padding: 10,
                border: "none",
              }}
              onChange={onChange}
            >
              <option disabled value="">
                Lọc theo chủ đề
              </option>
              {tagList.map((tag, index) => {
                return (
                  <option key={index} value={tag._id}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
          )
        )}
      </form>
      {showOption ? (
        <Grid className={classes.filterResult}>
          <h4>Lọc kết quả</h4>

          <Box display="flex" justifyContent="space-between" pl={3} pr={3}>
            {options.map((option, index) => {
              return (
                <Box
                  display="flex"
                  className={classes.filterItems}
                  style={
                    optionId === index ? { background: "#337ab71c" } : null
                  }
                  key={index}
                  onClick={() => setOptionId(index)}
                >
                  <option.icon className={classes.filterIcons} />
                  <b>{option.text}</b>
                </Box>
              );
            })}
          </Box>
        </Grid>
      ) : (
        ""
      )}
      <hr />
      <Grid>
        <h4>Kết quả tìm kiếm</h4>
        {userList && <SearchUserList users={userList} />}
        {groupList && <SearchGroupList groups={groupList} />}
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(SearchPage);
