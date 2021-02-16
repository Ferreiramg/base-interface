import React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Toolbar, Button, Typography, LinearProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { useDispatch, useSelector } from "react-redux";
import { FAT_FOB, FAT_EXPORT_FOB_CLEAN } from 'utils/constants/actionTypes';

const linkRef = React.createRef();
function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}

const FobList = ({ title, actions }) => {
    const dispatch = useDispatch();
    const { anexo_fob, data_fob, isLoading, error } = useSelector(({ Faturamento }) => Faturamento);

    const downloadCSV = () => {
        if (anexo_fob.length > 1) {
            const a = linkRef.current;
            a.download = "fob.csv"
            a.href = anexo_fob;
            a.click();
            a.href = '';
            actions.notification({
                msg: "Aguarde o download!",
                vertical: "bottom",
                horizontal: "left",
            });
            dispatch({ type: FAT_EXPORT_FOB_CLEAN });//remove arquivo do store
        }
    };
    React.useEffect(() => {
        dispatch({ type: FAT_FOB });
    }, []);

    return (
        <>
            <a ref={linkRef} />
            <Toolbar>
                <Typography variant="h6" component="div">
                    {title}
                </Typography>
                <span style={{ flex: '1 1 auto' }} />
                <Button
                    onClick={e => downloadCSV()}
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}>
                    Download Arquivo
                </Button>
            </Toolbar>
            <div style={{ display: 'flex', height: '84%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={isLoading}
                        rows={data_fob} columns={columns}
                    />
                </div>
            </div>
        </>
    )
};

const columns = [

    { field: 'NFE', headerName: 'NFE' },
    { field: 'CLIENTE', headerName: 'Cliente', flex: 0.8 },
    { field: 'PESO', headerName: 'Peso (Kg)', width: 180 },
    { field: 'VALOR', headerName: 'Valor Liquido (R$)', width: 180 }
];
export default FobList;