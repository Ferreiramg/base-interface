import React from 'react';
import { Drawer, Toolbar } from '@material-ui/core';


const EditDrawer = ({ children, state, setState, title }) => {

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <Drawer
            style={{ overflowY: 'none' }}
            anchor="right"
            open={state}
            onClose={toggleDrawer(false)}
        >
            <Toolbar>
                <h4>{title}</h4>
            </Toolbar>
            {children}
        </Drawer>
    );
};

export default EditDrawer;