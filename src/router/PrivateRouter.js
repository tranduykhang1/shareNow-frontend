import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogged from "assets/Config/jwtChecker";

const PrivateRoute = ({ ...rest }) => {
    let { pathname } = window.location;
    let publicUrls = ['/login', '/register', '/forgot-password', '/update-password', '/email-confirm']

    if (publicUrls.includes(pathname)) {
        return <Route {...rest} />;
    } else {
        return isLogged ? <Route {...rest} /> : <Redirect to="/login" />;
    }
};

export default PrivateRoute;
