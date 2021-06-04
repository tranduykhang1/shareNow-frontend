import React from "react";
import { useRouteMatch } from "react-router";

import Navigation from "components/shared/LeftNavigation/Navigation";
import RightSide from "components/shared/RightSide/RightSide";
import SearchPage from "./SearchPage/SearchPage";

const Index = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Navigation />
      <SearchPage/>
      <RightSide />
    </>
  );
};

export default Index;
