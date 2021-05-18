import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, TextField, MenuItem } from '@material-ui/core';

import { GET_CONCILIACAO, GET_CONCILIACAO_IMPORT } from 'utils/constants/actionTypes';

const linkRef = React.createRef();

const Conciliacao = ({ title }) => {
    const dispatch = useDispatch();
    const { anexo, isLoading, error } = useSelector(({ Conciliacao }) => Conciliacao);

    React.useEffect(() => {
        if (error !== null) {
            // dispatch({ type: GET_CONCILIACAO });
            const href = window.URL.createObjectURL(anexo);
            const a = linkRef.current;
            a.download = 'clientes.xlsx';
            a.href = href;
            a.click();
            a.href = '';
        }
    }, [dispatch, anexo, error]);

    const onUpload = (event) => {
        event.preventDefault();
        const xlsfile = event.target.files[0];
        if (xlsfile === undefined) return;
        const form = new FormData();
        form.append("file", xlsfile);
        //dispatch({ type: GET_CONCILIACAO_IMPORT, payload: form });
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
                    value={''}
                    onChange={e => { }}
                >
                    <MenuItem value="cliente">Clientes</MenuItem>
                    <MenuItem value="fornecedor">Fornecedores</MenuItem>
                    <MenuItem value="transportadora">Transportadoras</MenuItem>
                </TextField>
                <label htmlFor="contained-button-file">
                    <Button
                        style={{ flex: '1' }}
                        variant="contained"
                        component="span"
                        disabled={isLoading}
                        startIcon={<CloudUploadIcon style={{ color: "forestgreen" }} />}
                    >Enviar</Button>
                </label>
            </Toolbar>

            <input
                accept=".xlsx, .xls, .csv"
                style={{ display: 'none' }}
                onChange={e => {
                    onUpload(e);
                    e.target.value = null;
                }}
                id="contained-button-file"
                type="file"
            />
        </>
    );
}

export default Conciliacao;