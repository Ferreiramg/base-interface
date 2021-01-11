import React from 'react';
import Notify from './Notify';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeToast } from 'store/actions';

const Toasts = ({ actions, toasts }) => {
    const { removeToast } = actions;
    const handleClose = (id) => {
        removeToast(id);
        return true;
    }
    return (
        <>
            {toasts.map(toast => {
                const { id } = toast;
                return (
                    <Notify {...toast} key={id} handleClose={() => handleClose(id)} />
                );
            })}
        </>
    );
};
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ removeToast }, dispatch)
});

const mapStateToProps = state => ({
    toasts: state.toasts
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
