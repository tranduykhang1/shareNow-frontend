import React from "react";
import { useRouteMatch } from "react-router";
import CommentDialog from "./CommentDialog";
import CommentExpand from "./CommentExpand";

const CommentPage = () => {
  const { path } = useRouteMatch();
  return <>{path !== "/post/:id" ? <CommentDialog /> : <CommentExpand />}</>;
};

export default CommentPage;
