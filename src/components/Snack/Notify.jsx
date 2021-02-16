import React from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

const Notify = ({ vertical, horizontal, msg, severity, handleClose }) => {

    return (
        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            TransitionComponent={TransitionRight}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(Notify, () => false);