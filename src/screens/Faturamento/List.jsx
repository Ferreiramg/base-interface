import React from 'react';
import { DataGrid, GridOverlay } from '@material-ui/data-grid';
import { Toolbar, IconButton, Typography, LinearProgress } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import EditDrawer from 'components/Drawer/EditDrawer';

import { useDispatch, useSelector } from "react-redux";
import { FAT_LIST_ALL, FAT_SELECT_EDIT, FAT_DELETE } from 'utils/constants/actionTypes';

import Create from './Create';

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                <LinearProgress />
            </div>
        </GridOverlay>
    );
}

const ListFaturamento = ({ title, actions }) => {
    const dispatch = useDispatch();
    const { faturamentos, selected, isLoading } = useSelector(({ Faturamento }) => Faturamento);
    const error = useSelector(state => state.errorReducer.error);
    const [_open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if (faturamentos.length === 0)
            dispatch({ type: FAT_LIST_ALL });
    }, [dispatch, faturamentos]);

    const rows = faturamentos.map(v => {
        return {
            id: +v[0],
            valor_total: v[1],
            peso: v[2],
            fundo: v[3],
            bonificacao: v[4],
            created_at: v[5],
            descricao: v[6]
        };
    });

    const selectedRow = async (newSelection) => {
        let id = newSelection.rowIds[0];
        await dispatch({ type: FAT_SELECT_EDIT, payload: rows.filter(i => i.id === +id)[0] });
    };

    async function deleteSelected({ id }) {
        if (window.confirm("Ação não pode ser desfeita, deseja Apagar o registro?")) {
            await dispatch({ type: FAT_DELETE, id });
            if (error === null)
                actions.notification({ msg: "o registro foi apagado com sucesso!" });
        }
    }

    return (
        <>
            <Toolbar>
                <Typography style={{ flex: '1 1 100%' }} variant="h6" component="div">
                    {title}
                </Typography>
                <IconButton disabled={selected?.id === undefined} onClick={e => setOpen(true)} aria-label="delete">
                    <EditIcon />
                </IconButton>
                <IconButton disabled={selected?.id === undefined} onClick={e => deleteSelected(selected)} type="submit" aria-label="delete">
                    <DeleteForeverIcon />
                </IconButton>
            </Toolbar>
            <div style={{ display: 'flex', height: '84%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        onSelectionChange={selectedRow}
                        components={{
                            loadingOverlay: CustomLoadingOverlay,
                        }}
                        loading={isLoading}
                        rows={rows} columns={columns} pageSize={25}
                        localeText={{
                            footerRowSelected: (count) => `ID Selecionado: ${selected.id}`,
                        }}
                    />
                </div>
            </div>
            <EditDrawer title={"Editar Faturamento"} state={_open} setState={setOpen}><Create actions={actions} item={selected} /></EditDrawer>
        </>
    )
};
const columns = [
    { field: 'id', headerName: 'ID', width: 75 },
    { field: 'valor_total', headerName: 'Faturamento', width: 150 },
    { field: 'peso', headerName: 'Peso ', width: 150 },
    { field: 'fundo', headerName: 'Fundo', width: 110 },
    { field: 'bonificacao', headerName: 'Bonificacões', width: 110 },
    { field: 'created_at', headerName: 'Data', width: 150 },
    { field: 'descricao', headerName: 'Descrição Faturamento', width: 320 },
];

export default ListFaturamento;