import React from 'react';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = props => {
  const data = [1,2,3,4,5,6,6,8]

  const reply = () =>{
    props.reply(reply)
  }
  const renderComment = data.map((data, i) =>{
      return <CommentItem key={i} reply={reply} />

  })
  return (
    <div>
      {renderComment}
    </div>
  );
};

export default CommentList;