import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, title, Component, exact }) => {
    const condition = true;
    return condition ? (<Route path={path} exact={exact} render={() => <Component title={title} />} />) :
        (<Redirect to="/page/login" />);
};
export default PrivateRoute;