import { Grid } from '@material-ui/core';
import React from 'react';

import NotificationList from '../NotificationList/NotificationList';

const style = {
  margin: '0 auto',
  padding: "0 40px"
}

const NotificationPage = (props) => {
  return (
    <Grid item sm={12} md={7} style={style}>
      <NotificationList/>
     </Grid>
  );
};

export default NotificationPage;