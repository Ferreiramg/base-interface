import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
    const dispatch = useDispatch();
    const { msg, show, severity } = useSelector(({ notification }) => notification);

    const handleClose = () => dispatch({ type: 'notifcation_close' })
    return (
        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={show}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    );
};
export default Notification;