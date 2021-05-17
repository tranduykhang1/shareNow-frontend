import { Grid, withStyles } from '@material-ui/core';
import {} from '@material-ui/core'
import PostList from 'components/shared/Post/PostList/PostList';
import TagList from 'components/shared/TagList/TagList';
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
      <TagList/>
      <PostList/>
     </Grid>
  );
};

export default withStyles(style)(HomePage);
