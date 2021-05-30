import React from "react";


import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import ForgotPassword from "components/Auth/ForgotPassoword/ForgotPassword";
import UpdatePassword from "components/Auth/UpdatePassword/UpdatePassword";
import EmailConfirm from "components/Auth/EmailConfirm/EmailConfirm";
import HomePage from "components/Main/Home/index";
import Message from "components/Main/Messages/index";
import Search from "components/Main/Search/index";
import GroupPage from "components/Main/Group/index";
import Notification from "components/Main/Notification/index";
import Profile from "components/Main/Profile/index";
import PostDetail from "components/Main/PostDetail/PostDetail";
import GroupDetail from "components/Main/GroupDetail/index";

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
        path: "/search",
        exact: false,
        main: () => < Search / > ,
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
        path: "/update-profile/:id",
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
    {
        path: "/email-confirm",
        exact: false,
        main: () => < EmailConfirm / > ,
    },
];

export default routes;