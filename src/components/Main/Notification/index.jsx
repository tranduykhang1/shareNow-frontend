import React from 'react';

import Navigation from 'components/shared/LeftNavigation/Navigation';
import RightSide from 'components/shared/RightSide/RightSide';
import NotificationPage from './NotificationPage/NotificationPage';

const index = () => {
  return (
    <>
      <Navigation />
      <NotificationPage/>
      <RightSide/>
    </>
  );
};

export default index;