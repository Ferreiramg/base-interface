import React from 'react';
import { useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem,ListItemIcon, ListItemText, ListSubheader, Paper } from '@material-ui/core';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { GET_CONCILIACAO } from 'utils/constants/actionTypes'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        padding: theme.spacing(1)
    },
}));

export default function MenuListConciliacao({ menu }) {

    const dispatch = useDispatch();

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const handleListItemClick = (event, index, name) => {
        setSelectedIndex(index);
        dispatch({ type: GET_CONCILIACAO, payload: name });
    };

    return (

        <Paper className={classes.root}>
            <List component="nav" aria-label="list conciliacoes" subheader={<ListSubheader>Conciliações</ListSubheader>}>
                {
                    menu && menu.map((item, k) =>
                        <ListItem
                            dense
                            key={k}
                            button
                            selected={selectedIndex === k}
                            onClick={(event) => handleListItemClick(event, k, item.name)}
                        >
                            <ListItemIcon>
                                <DescriptionOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary={item.name.toLowerCase()} />
                        </ListItem>
                    )
                }
            </List>
        </Paper>
    );
}
