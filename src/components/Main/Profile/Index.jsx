import React from "react";
import { useRouteMatch } from "react-router";

import Navigation from "components/shared/LeftNavigation/Navigation";
import RightSide from "components/shared/RightSide/RightSide";
import ProfilePage from "./ProfilePage/ProfilePage";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";

const Index = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <Navigation />
      {path === "/update-profile/:id" ? <UpdateProfileForm /> : <ProfilePage />}
      <RightSide />
    </>
  );
};

export default Index;
