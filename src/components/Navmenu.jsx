import React from "react";
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className={classes.root}>
            <nav className={classes.lists} aria-label="mailbox folders">
                <List>
                    <ListItem component={RouterLink} to={'/'} button>
                        <ListItemIcon>
                            <HomeIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItemLink to="/fechamento" open={open} onClick={handleClick} />
                    <Collapse component="li" in={open} timeout="auto" unmountOnExit>
                        <List disablePadding>
                            <ListItemLink to="/fechamento/important" className={classes.nested} />
                        </List>
                    </Collapse>
                    <ListItemLink to="/conciliacao" />
                    <ListItemLink to="/spam" />
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