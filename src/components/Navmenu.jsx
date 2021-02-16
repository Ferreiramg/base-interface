import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { breadcrumbNameMap } from "screens/routes";

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}
function ListItemLink(props) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    return (
        <li>
            <ListItem button component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
                {open != null ? open ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItem>
        </li>
    );
}

const Navmenu = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState({
        0: false, 1: false, 2: false
    });

    const handleClick = (key = 0) => {
        setOpen((prevOpen) => ({ ...open, [key]: !prevOpen[key] }));
    };

    return (
        <div className={classes.root}>
            <nav className={classes.lists} aria-label="mailbox folders">
                <List>
                    <ListItem component={RouterLink} to={'/'} button>
                        <ListItemIcon>
                            <HomeIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <ListItemLink to="/fechamento" open={open[0]} onClick={e => handleClick(0)} />
                    <Collapse component="li" in={open[0]} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItemLink to="/fechamento/important" className={classes.nested} />
                        </List>
                    </Collapse>
                    <ListItemLink to="/conciliacao" />
                    <Divider />
                    <ListItemLink to="/faturamento" open={open[1]} onClick={e => handleClick(1)} />
                    <Collapse component="li" in={open[1]} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItemLink to="/faturamento/checkout" className={classes.nested} />
                        </List>
                        <List disablePadding>
                            <ListItemLink to="/faturamento/listar" className={classes.nested} />
                        </List>
                        <List disablePadding>
                            <ListItemLink to="/faturamento/fob" className={classes.nested} />
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItemLink to="/reports" open={open[2]} onClick={e => handleClick(2)} />
                    <Collapse component="li" in={open[2]} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItemLink to="/reports/timeseries" className={classes.nested} />
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItemLink to="/ckeditor" />
                    <ListItemLink to="/firestore" />
                </List>
            </nav>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 300,
    },
    lists: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default Navmenu;