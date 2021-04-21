import { Typography, withStyles } from '@material-ui/core';
import React from 'react';
import NotificationItem from '../NotificationItem/NotificationItem';

import style from "./Style"

const NotificationList = props => {
  const {classes} = props

  const data = [
    {
      user: 'Lilly Hammond',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
    {
      user: 'Gerald Mathis',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
    {
      user: 'Cornelia Martin',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
    {
      user: 'Mayme Obrien',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
    {
      user: 'Derek Summers',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
    {
      user: 'Lilly Hammond',
      content: 'energy fully simplest funny wonderful flame feature could farther blanket view minerals remarkable band involved lying again help past forth seat mainly horse both'
    },
  ]

  const renderNotifyItem = data.map((d, i) =>{
    return (
      <NotificationItem data={d} key={i}/>
    )
  })

  return (
    <div>
      <Typography className={classes.title}>Thông báo của bạn (2)</Typography>
      {renderNotifyItem}
    </div>
  );
};

export default withStyles(style)(NotificationList);