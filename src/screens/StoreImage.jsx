import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button, Grid, Toolbar, Typography, LinearProgress } from '@material-ui/core';


import { CAPTURE_IMAGE } from 'utils/constants/actionTypes';

const linkRef = React.createRef();

const StoreImages = ({ title, actions }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isLoading, error, progress, capturedImage } = useSelector(({ Images }) => Images);

    const onUpload = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file === undefined) return;
        dispatch({ type: CAPTURE_IMAGE, file });
    };

    return (
        <>
            <a ref={linkRef} />
            <Toolbar>
                <Typography variant="h6" style={{ flex: '1 1 auto' }} component="div">
                    {title}
                </Typography>
                <label htmlFor="contained-button-file-fb">
                    <Button
                        style={{ flex: '1' }}
                        variant="contained"
                        component="span"
                        disabled={isLoading}
                        startIcon={<CloudUploadIcon style={{ color: "forestgreen" }} />}
                    >Enviar</Button>
                </label>
            </Toolbar>
            {
                isLoading && <LinearProgress value={progress} className={classes.bar} color="secondary" />
            }
            <Grid container spacing={2}>
                {
                    capturedImage.length > 0 &&
                    <img src={capturedImage} width="300" height="234" />
                }
            </Grid>
            <input
                style={{ display: 'none' }}
                onChange={e => {
                    onUpload(e);
                    e.target.value = null;
                }}
                disabled={isLoading}
                id="contained-button-file-fb"
                type="file"
            />
        </>
    );
};

const useStyles = makeStyles(theme => ({
    bar: {
        zIndex: 999,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export default StoreImages;