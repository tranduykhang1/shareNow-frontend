import CommentPage from "components/Main/Comment/CommentPage/CommentPage";
import React from "react";
import PostItems from "../PostItems/PostItems";

const PostList = (props) => {

  const renderItems = props.data.map((post, index) => {
    return <PostItems key={index} post={post} />;
  });
  return (
    <div>
      <CommentPage />
      <div style={{padding: '0 6%'}}>{renderItems}</div>
    </div>
  );
};

export default PostList;
