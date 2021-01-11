import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Table, TableBody, TableRow, TablePagination, TableHead, TableContainer, TableCell } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        maxHeight: '60vh'
    }
});

export default function StickyHeadTable({ rows, columns }) {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map(column => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, k) => {
                                return (
                                    <StyledTableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={k}
                                    >
                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100, 500]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.secondary,
        color: theme.palette.titleBar
    },
    body: {
        fontSize: 12
    }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.background.default
        }
    },
    hover: {
        "&:hover": {
            backgroundColor: "rgba(33,150,243,0.2) !important"
        }
    }
}))(TableRow);
