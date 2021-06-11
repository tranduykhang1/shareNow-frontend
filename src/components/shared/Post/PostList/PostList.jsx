import CommentPage from "components/Main/Comment/CommentPage/CommentPage";
import Loading from "components/shared/Loading/Loading";
import React from "react";
import PostItems from "../PostItems/PostItems";
import EditPost from "../EditPost"

const PostList = ({ data }) => {
  const renderItems = data.map((post, index) => {
    return <PostItems key={index} post={post} />;
  });


  return (
    <div>
      <EditPost />
      <CommentPage />
      <div style={{ padding: "0 6%" }}>{renderItems}</div>
      {data.length ? (
        <div style={{ margin: "40px 0" }}>
          {!data && <Loading />}
        </div>
      ): ""}
    </div>
  );
};

export default PostList;
