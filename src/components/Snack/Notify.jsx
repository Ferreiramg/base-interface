import React from 'react';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const Notify = ({ vertical, horizontal, msg, severity, handleClose }) => {

    return (
        <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical, horizontal }}
            open={true}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity}>
                {msg}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(Notify, () => false);