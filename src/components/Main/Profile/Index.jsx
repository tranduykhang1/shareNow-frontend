import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import Navigation from "components/shared/LeftNavigation/Navigation";
import RightSide from "components/shared/RightSide/RightSide";
import ProfilePage from "./ProfilePage/ProfilePage";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import { useSelector } from "react-redux";

const Index = () => {
  const { path } = useRouteMatch();

  let currentUser = ""
  currentUser = useSelector(state => state.user.currentUser)

  console.log(currentUser)

  return (
    <>
      <Navigation />
      {path === "/update-profile/:id" ? (
        currentUser && <UpdateProfileForm preValues={currentUser} />
      ) : (
        <ProfilePage />
      )}
      <RightSide />
    </>
  );
};

export default Index;
