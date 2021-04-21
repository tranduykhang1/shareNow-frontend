import React from "react";
import Navigation from "components/shared/LeftNavigation/Navigation";
import GroupList from "../Group/GroupList/GroupList";
import GroupDetailPage from "./GroupDetailPage/GroupDetailPage";

const index = () => {
  return (
    <>
      <Navigation />
      <GroupDetailPage />
      <GroupList />
    </>
  );
};

export default index;
