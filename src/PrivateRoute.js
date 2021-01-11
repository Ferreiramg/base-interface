import React from "react";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Toast from 'components/Snack/Toasts';
import { addToast } from 'store/actions';

const PrivateRoute = ({ path, title, Component, exact, actions }) => {
    const condition = true;
    return <>
        {condition ? (<Route path={path} exact={exact} render={() => <Component title={title} actions={actions} />} />) :
            (<Redirect to="/page/login" />)}
        <Toast />
    </>
};
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ addToast, notification: addToast }, dispatch)
});
export default connect(null, mapDispatchToProps)(PrivateRoute);