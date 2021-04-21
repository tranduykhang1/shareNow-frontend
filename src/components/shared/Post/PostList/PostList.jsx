import CommentPage from "components/Main/Comment/CommentPage/CommentPage";
import React from "react";
import PostItems from "../PostItems/PostItems";

const PostList = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  const renderItems = data.map((data, i) => {
    return <PostItems key={i} />;
  });
  return (
    <div>
      <CommentPage />
      <div style={{padding: '0 6%'}}>{renderItems}</div>
    </div>
  );
};

export default PostList;
