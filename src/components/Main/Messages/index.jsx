import { Grid } from "@material-ui/core";
import Navigation from "components/shared/LeftNavigation/Navigation";
import React, { useEffect } from "react";
import Message from "./MessagePage/MessagePage";



const Index = () => {

  return (
    <>
      <Navigation />
      <Message />
    </>
  );
};

export default Index;
