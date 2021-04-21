import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import React from "react";
import Message from "./MessagePage/MessagePage";

const index = () => {
  return (
    <>
      <Navigation />
      <Message />
    </>
  );
};

export default index;
