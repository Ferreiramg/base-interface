import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Navbar from "./Navbar";
import { Route } from 'react-router';
import { Switch, BrowserRouter, Link as RouterLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { breadcrumbNameMap } from "screens/routes";
import PrivateRoute from "../PrivateRoute";
import { privateRoutes } from "screens/routes";

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;
const Navcrumbs = () => {
    return (
        <Route>
            {({ location }) => {
                const pathnames = location.pathname.split('/').filter((x) => x);
                return (
                    <Breadcrumbs aria-label="breadcrumb">
                        <LinkRouter color="inherit" to="/">
                            Principal
                        </LinkRouter>
                        {pathnames.map((value, index) => {
                            const last = index === pathnames.length - 1;
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                            return last ? (
                                <Typography color="textPrimary" key={to}>
                                    {breadcrumbNameMap[to]}
                                </Typography>
                            ) : (
                                    <LinkRouter color="inherit" to={to} key={to}>
                                        {breadcrumbNameMap[to]}
                                    </LinkRouter>
                                );
                        })}
                    </Breadcrumbs>
                );
            }}
        </Route>
    );
};

const ContainerBase = () => {
    const error = useSelector(state => state.errorReducer.error);
    return (
        <>
            <BrowserRouter>
                <Navbar></Navbar>
                <Container maxWidth="lg">
                   
                    <Paper style={{ padding: '10px', marginTop: '70px', height: '88vh' }} >
                        <Navcrumbs />
                        <Divider />
                        <Switch>
                            {privateRoutes.map(params => <PrivateRoute {...params} />)}
                        </Switch>
                    </Paper>
                </Container>
            </BrowserRouter>
        </>
    );
};
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(5)
    },

}));
export default ContainerBase;