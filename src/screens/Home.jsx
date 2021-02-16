import React from "react";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';

const Home = ({ title, actions }) => {

    return (
        <>
            <Toolbar>
                <Typography variant="h6" style={{ flex: '1 1 100%' }} component="div">
                    {title}
                </Typography>
                <Button onClick={e => actions.addToast({ msg: "testando o toast" })} variant="contained">Default</Button>
            </Toolbar>
            <div style={{ display: 'flex', height: '84%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        localeText={{
                            footerRowSelected: (count) => `${title}`,
                            footerTotalRows: 'Total:',
                            footerPaginationRowsPerPage: 'Linhas por Pagina:',
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection />
                </div>
            </div>

        </>
    )
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default Home;