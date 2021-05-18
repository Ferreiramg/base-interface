import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { CustomThemeContext } from 'components/CustomThemeProvider';
import Navmenu from "./Navmenu";


const Navbar = () => {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const { currentTheme, setTheme } = React.useContext(CustomThemeContext)
    const isDark = Boolean(currentTheme === 'dark')

    const handleThemeChange = (event) => {
        const { checked } = event.target
        if (checked) {
            setTheme('dark')
        } else {
            setTheme('normal')
        }
    }
    const toggleDrawer = (open) => (event) => {
        console.log(open);
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(open);
    };
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" onClick={toggleDrawer(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Admin Base Template
              </Typography>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={isDark} onChange={handleThemeChange} name="mode" />}
                        />
                    </FormGroup>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
                <Navmenu />
            </Drawer>
        </div>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
export default Navbar;