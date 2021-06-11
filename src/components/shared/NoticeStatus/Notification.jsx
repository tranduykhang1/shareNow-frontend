import { Avatar, Box, Grow, Paper, Slide } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function Notification() {
  let isFollowing = useSelector((state) => state.user.isFollowing);

  useEffect(() => {
    if (isFollowing > 0) {
      toast(() => (
        <span>
          Các bạn đã có thể <b>trò chuyện</b> với nhau.
          <br/>
          <a href="/message">Bắt đầu trò chuyện</a>
        </span>
      ));
    }
  }, [isFollowing]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
