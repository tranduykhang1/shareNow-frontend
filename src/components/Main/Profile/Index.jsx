import React from "react";
import { useParams } from "react-router";

import Navigation from "components/shared/LeftNavigation/Navigation";
import RightSide from "components/shared/RightSide/RightSide";
import ProfilePage from "./ProfilePage/ProfilePage";

const Index = () => {
  const { id } = useParams();

  return (
    <>
      <Navigation />
      <ProfilePage />
      <RightSide />
    </>
  );
};

export default Index;
