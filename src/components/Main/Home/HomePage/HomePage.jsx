import { Grid, withStyles } from '@material-ui/core';
import {} from '@material-ui/core'
import PostList from 'components/shared/Post/PostList/PostList';
import React from 'react';

import UploadCard from '../UploadForm/UploadCard';

const style = {
  marginLeft: '21.5%',
  padding: "0 40px"
}

const HomePage = (props) => {
  return (
    <Grid item sm={12} md={6} style={style}>
      <UploadCard/>
      <PostList/>
     </Grid>
  );
};

export default withStyles(style)(HomePage);