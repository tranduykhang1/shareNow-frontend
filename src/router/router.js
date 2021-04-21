import React from "react";

import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import ForgotPassword from "components/Auth/ForgotPassoword/ForgotPassword";
import UpdatePassword from "components/Auth/UpdatePassword/UpdatePassword";
import HomePage from "components/Main/Home/index";
import Message from "components/Main/Messages/index"
import GroupPage from "components/Main/Group/index";
import Notification from "components/Main/Notification/index"
import Profile from "components/Main/Profile/Index"
import PostDetail from "components/Main/PostDetail/PostDetail";
import GroupDetail from "components/Main/GroupDetail/index"


const routes = [{
        path: "/",
        exact: true,
        main: () => < HomePage / > ,
    },
    {
        path: "/message",
        exact: false,
        main: () => < Message / > ,
    },
    {
        path: "/groups",
        exact: false,
        main: () => < GroupPage / > ,
    },
    {
        path: "/notification",
        exact: false,
        main: () => < Notification / > ,
    },
    {
        path: "/profile/:id",
        exact: false,
        main: () => < Profile / > ,
    },
    {
        path: "/post/:id",
        exact: false,
        main: () => < PostDetail / > ,
    },
    {
        path: "/group/:id",
        exact: false,
        main: () => < GroupDetail / > ,
    },
    {
        path: "/login",
        exact: false,
        main: () => < Login / > ,
    },
    {
        path: "/register",
        exact: false,
        main: () => < Register / > ,
    },
    {
        path: "/forgot-password",
        exact: false,
        main: () => < ForgotPassword / > ,
    },
    {
        path: "/update-password",
        exact: false,
        main: () => < UpdatePassword / > ,
    },
];

export default routes;