import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Button, Grid, Toolbar, Typography, TextField, MenuItem, LinearProgress } from '@material-ui/core';
import StickyHeadTable from 'components/StickyHeadTable';
import MenuListConciliacao from './MenuListConciliacao';

import { IMPORT_CONCILIACAO, LIST_CONCILIACAO, RESET_CONCILIACAO } from 'utils/constants/actionTypes';

const linkRef = React.createRef();

const Conciliacao = ({ title, actions }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { anexo, isLoading, error, menuItens, data } = useSelector(({ Conciliacao }) => Conciliacao);
    const [tipo, setTipo] = React.useState('');

    const selectChange = (e) => setTipo(e.target.value);

    React.useEffect(() => {
        if (anexo.length > 0) {
            const href = anexo;
            const a = linkRef.current;
            a.download = `${tipo.toLowerCase()}.xlsx`;
            a.href = href;
            a.click();
            a.href = '';
            dispatch({ type: RESET_CONCILIACAO });
            actions.notification({ msg: "Conciliação concluida com sucesso, aguarde o download!" });
        }
        if (error !== null) {
            // eslint-disable-next-line
            actions.notification({ msg: error.statusText, severity: 'error' });
        }
    }, [anexo, tipo, error]);

    React.useEffect(() => {
        if (menuItens.length === 0) {
            // eslint-disable-next-line
            dispatch({ type: LIST_CONCILIACAO });
        }
    }, [menuItens]);

    const onUpload = async (event) => {
        event.preventDefault();
        const xlsfile = event.target.files[0];
        if (xlsfile === undefined) return;
        const form = new FormData();
        form.append("file", xlsfile);
        form.append('sheetname', tipo.toUpperCase());
        dispatch({ type: IMPORT_CONCILIACAO, form });
    };

    return (
        <>
            <a ref={linkRef} />
            <Toolbar>
                <Typography variant="h6" style={{ flex: '1 1 auto' }} component="div">
                    {title}
                </Typography>
                <TextField
                    style={{ flex: '0.4', marginRight: '5px' }}
                    select
                    margin="dense"
                    variant="outlined"
                    label="Conciliar em:"
                    value={tipo}
                    onChange={selectChange}
                >
                    <MenuItem value="cliente">Clientes</MenuItem>
                    <MenuItem value="fornecedores">Fornecedores</MenuItem>
                    <MenuItem value="transportadoras">Transportadoras</MenuItem>
                </TextField>
                <label htmlFor="contained-button-file">
                    <Button
                        style={{ flex: '1' }}
                        variant="contained"
                        component="span"
                        disabled={isLoading || tipo === ''}
                        startIcon={<CloudUploadIcon style={{ color: "forestgreen" }} />}
                    >Enviar</Button>
                </label>
            </Toolbar>
            {
                isLoading ? <LinearProgress className={classes.bar} color="secondary" /> : null
            }
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <MenuListConciliacao menu={menuItens} />
                </Grid>
                <Grid item xs={8} style={{ height: '84%' }}>
                    {data.length > 0 && <StickyHeadTable rows={data} columns={columns} />}
                </Grid>
            </Grid>
            <input
                accept=".xlsx, .xls, .csv"
                style={{ display: 'none' }}
                onChange={e => {
                    onUpload(e);
                    e.target.value = null;
                }}
                disabled={isLoading || tipo === ''}
                id="contained-button-file"
                type="file"
            />
        </>
    );
};
const columns = [
    { id: 0, label: "Codigo", minWidth: 80 },
    { id: 2, label: "Razão Social", minWidth: 220 },

    {
        id: 13,
        label: "Valor Duplicatas",
        minWidth: 100,
        align: "right"
    },
];
const useStyles = makeStyles(theme => ({
    bar: {
        zIndex: 999,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export default Conciliacao;