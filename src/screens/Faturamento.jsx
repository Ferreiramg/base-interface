import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import CheckIcon from '@material-ui/icons/Check';
import DollarIcon from '@material-ui/icons/AttachMoney';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Button, Grid, Toolbar, Typography, TextField, CardContent, Card, CardActions, LinearProgress } from '@material-ui/core';

import CardWithIcon from 'components/CardWithIcon';
import { FAT_CHECKOUT_SAVE, FAT_CHECKOUT_READ, FAT_LIST_ALL } from 'utils/constants/actionTypes';
const Faturamento = ({ title, actions }) => {

    const { faturamento, error, isLoading } = useSelector(({ Faturamento }) => Faturamento);
    const dispatch = useDispatch();
    const classes = useStyles();
    const hasfaturamento = Object.keys(faturamento).length > 0;
    const [pasta, setPasta] = React.useState('');
    const [desc, setDesc] = React.useState('');

    const handlerSubmit = async (e) => {
        await dispatch({ type: FAT_CHECKOUT_SAVE, payload: { ...faturamento, desc } });
        if (error === null) {
            actions.notification({ msg: "Faturamento salvo com sucesso!" });
            dispatch({ type: FAT_LIST_ALL });
        }
        else {
            actions.notification({ msg: "Falha ao salvar Faturamento!", severity: 'danger' });
        }
    };

    const handlerGetFat = async (e) => {
        dispatch({ type: FAT_CHECKOUT_READ, path: pasta });
    };

    return <>
        <Toolbar >
            <Typography variant="h6" style={{ flex: '1 1 auto' }} component="div">
                {title}
            </Typography>
            <TextField className={classes.space} size="small" onChange={(e) => setDesc(e.target.value)} type="text" name="descricao" label="Descrição Faturamento" variant="outlined" required />
            <TextField className={classes.space} size="small" onChange={(e) => setPasta(e.target.value)} type="text" name="pasta" label="Nome da Pasta" variant="outlined" required />
            <Button
                className={classes.space}
                variant="contained"
                color="primary"
                onClick={handlerGetFat}
                startIcon={<CheckIcon />}
            >Checar</Button>

        </Toolbar>
        {
            isLoading ? <LinearProgress className={classes.bar} color="secondary" /> : null
        }
        <Grid direction="column" container>
            {hasfaturamento && <>
                <Card className={classes.card}>
                    <CardContent>
                        <Grid direction="row" alignItems="center" container spacing={2}>
                            <Grid xs={6} item><CardWithIcon
                                icon={DollarIcon}
                                title={"Faturamento"}
                                subtitle={faturamento.valor_liquido}
                            /><br /></Grid>
                            <Grid xs={6} item> <CardWithIcon
                                icon={LocalShippingIcon}
                                title={"Peso"}
                                subtitle={faturamento.peso}
                            /><br /></Grid>
                        </Grid>
                        <Grid direction="row" alignItems="center" container spacing={2}>
                            <Grid xs={6} item> <CardWithIcon
                                icon={DollarIcon}
                                title={"Fundo"}
                                subtitle={faturamento.fundo}
                            /></Grid>
                            <Grid xs={6} item> <CardWithIcon
                                icon={DollarIcon}
                                title={"Bonificação"}
                                subtitle={faturamento.bonificacao}
                            /></Grid>
                        </Grid>
                        <Grid xs={12} item>
                            <br />
                            <Typography component="p" variant="caption">Numero de Notas: {faturamento.count}</Typography>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button color="secondary" onClick={handlerSubmit}>Salvar</Button>
                    </CardActions>
                </Card>
            </>}
        </Grid>
    </>;
};
const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 275,
    },
    card: {
        maxWidth: 490
    },
    space: {
        marginRight: theme.spacing(1)
    },
    bar: {
        zIndex: 999,
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));
export default Faturamento;