import { Grid, Typography } from "@material-ui/core";
import PostItems from "components/shared/Post/PostItems/PostItems";
import React from "react";

const style = {
  container: {
    marginLeft: "21.5%",
    padding: "0 80px",
  },
};

const GroupPage = (props) => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const renderItems = data.map((data, i) => {
    return <PostItems key={i} />;
  });
  return (
    <Grid item sm={12} md={6} style={style.container}>
      <Typography className="group-title">Các bài đăng trong nhóm</Typography>
      {renderItems}
    </Grid>
  );
};
export default GroupPage;
