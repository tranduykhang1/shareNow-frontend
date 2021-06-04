import { Box, Grid, Typography, withStyles } from "@material-ui/core";
import Icons from "constants/Icons/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SearchGroupList from "../SearchGroupList/SearchGroupList";
import SearchUserList from "../SearchUserList/SearchUserList";

import style from "./Style";
const SearchPage = (props) => {
  const { classes } = props;
  const [showOption, setShowOption] = useState(false);
  const [optionId, setOptionId] = useState();
  const { register, handleSubmit } = useForm();

  const options = [
    {
      id: "0",
      icon: Icons.FilterAllIcon,
      text: "Tất cả",
    },
    {
      id: "1",
      icon: Icons.PersonIcon,
      text: "Mọi người",
    },
    {
      id: "2",
      icon: Icons.Group,
      text: "Nhóm",
    },
  ];

  const search = (data) => {
    setShowOption(true);
    console.log(data);
  };

  let style = {
    marginLeft: "21.5%",
    padding: "0 40px",
  };

  return (
    <Grid item sm={12} md={6} style={style} className="responsiveGrid">
      <form className={classes.searchForm} onSubmit={handleSubmit(search)}>
        <Icons.SearchIcon className={classes.searchIcon} />
        <input
          name="query"
          type="text"
          className={classes.searchInput}
          placeholder="Tìm kiếm..."
          ref={register}
        />
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
        {/* <SearchUserList/> */}
        <SearchGroupList/>
      </Grid>
    </Grid>
  );
};

export default withStyles(style)(SearchPage);
