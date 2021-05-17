import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Masonry from "react-masonry-css";

import TabPanel from "./TabPanel";
import PostItems from "components/shared/Post/PostItems/PostItems";
import PhotoList from "../PhotoList/PhotoList";
import { Box, Typography } from "@material-ui/core";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  root: {
    width: "100%",
  },
};
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function TabBar(props) {
  const [value, setValue] = React.useState(0);
  const { classes } = props;
  const data = [1, 2, 3, 4, 5, 6, 7];

  const renderItems = data.map((data, i) => {
    return <PostItems key={i} />;
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div style={style.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          scrollButtons="auto"
        >
          s
          <Tab label="Bài viết" fullWidth={true} {...a11yProps(0)} />
          <Tab label="Ảnh" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      {value === 0 ? (
        <Box>{renderItems}</Box>
      ) : (
        <Box display="flex" style={{flexWrap: 'wrap', marginLeft: 50}}>
          {" "}
          <PhotoList />
        </Box>
      )}

      {/* <TabPanel value={value} index={0} component="div">
        {renderItems}
      </TabPanel>
      <TabPanel value={value} index={1} component="div">
        <Masonry
          breakpointCols={3}
          className="photo-grid"
          columnClassName="photo-grid_column"
        ></Masonry>
        <PhotoList />
      </TabPanel> */}
    </div>
  );
}
