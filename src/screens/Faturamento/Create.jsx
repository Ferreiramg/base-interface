import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { IMaskInput } from 'react-imask';
import { Grid, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import useForm from "hooks/useForm";
import { FAT_UPDATE } from 'utils/constants/actionTypes';

const IMaskNumber = (props) => {
    const _props = {
        mask: Number,  // enable number mask
        scale: 2,  // digits after point, 0 for integers
        signed: true,  // disallow negative
        thousandsSeparator: '.',  // any single char
        padFractionalZeros: false,  // if true, then pads zeros at end to the length of scale
        normalizeZeros: false,  // appends or removes zeros at ends
        radix: ',',  // fractional delimiter
        mapToRadix: ['.'],  // symbols to process as radix
        ...props
    }
    return <IMaskInput {..._props}
        inputRef={(ref) => {
            props.inputRef(ref);
        }}
        onAccept={
            (value, mask) => {
                props.onChange({
                    target: {
                        name: props.name,
                        value: value,
                    },
                });
            }
        }
    />
};

const CreateForm = ({ form, actions }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { error } = useSelector(({ Faturamento }) => Faturamento);
    const { state, handleOnChange, handleOnSubmit, disable } = useForm(
        {
            id: { value: form.id, error: '' },
            valor_total: { value: form.valor_total, error: '' },
            peso: { value: form.peso, error: '' },
            fundo: { value: form.fundo, error: '' },
            bonificacao: { value: form.bonificacao, error: '' },
            descricao: { value: form.descricao, error: '' },
            created_at: { value: form.created_at, error: '' },
        },
        validationStateSchema,
        onSubmitFormCallback
    );
    const { valor_total, peso, fundo, bonificacao, descricao, created_at } = state;

    async function onSubmitFormCallback(payload) {
        await dispatch({ type: FAT_UPDATE, payload: { id: form.id, ...payload } });
        if (error === null) {
            actions.notification({ msg: "o registro foi atualizado com sucesso!" });
        }
        else
            actions.notification({ msg: "Falha ao atualizar registro!", severity: 'danger' });
    };

    const hasError = (propert) => propert.error.length > 0;

    return (
        <form onSubmit={handleOnSubmit}>
            <Grid className={classes.root} container direction="column" spacing={1}>
                <TextField
                    error={hasError(valor_total)}
                    value={valor_total.value} onChange={handleOnChange}
                    required name="valor_total"
                    helperText={valor_total.error}
                    label="Total Faturamento"
                    InputProps={{
                        inputComponent: IMaskNumber,
                    }} />
                <br />
                <TextField
                    error={hasError(peso)}
                    value={peso.value} onChange={handleOnChange}
                    required name="peso"
                    helperText={peso.error}
                    label="Peso Faturamento"
                    scale={3}
                    InputProps={{
                        inputComponent: IMaskNumber,
                    }}
                />
                <br />
                <TextField error={hasError(fundo)} value={fundo.value}
                    onChange={handleOnChange} required
                    name="fundo" helperText={fundo.error}
                    label="Fundo Faturamento"
                    InputProps={{
                        inputComponent: IMaskNumber,
                    }}
                />
                <br />
                <TextField
                    error={hasError(bonificacao)} value={bonificacao.value}
                    onChange={handleOnChange} name="bonificacao"
                    helperText={bonificacao.error} label="Bonificação Faturamento"
                    InputProps={{
                        inputComponent: IMaskNumber,
                    }} />
                <br />
                <TextField error={hasError(descricao)} value={descricao.value} onChange={handleOnChange} required name="descricao" helperText={descricao.error} label="Descricao Faturamento" />
                <br />
                <TextField
                    name="created_at"
                    onChange={handleOnChange}
                    error={hasError(created_at)}
                    required
                    value={created_at.value}
                    label="Data Faturamento"
                    helperText={created_at.error}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>

            <div className={classes.bottomPush}>
                <Button disabled={disable} color="secondary" type="submit" className={classes.btnMargin}>Salvar</Button>
            </div>
        </form>
    );
}
const Create = (props) => {

    return <CreateForm {...props} form={props.item} />
}
const validator = {
    error: 'Não e um numero valido!',
};
const validationStateSchema = {
    valor_total: {
        required: true,
        validator
    },
    peso: { required: true, validator },
    descricao: { required: true },
    created_at: { required: true },
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: 420,
        padding: theme.spacing(2),
    },
    bottomPush: {
        position: "fixed",
        bottom: theme.spacing(4),
        textAlign: "center"
    },
    btnMargin: {
        marginLeft: theme.spacing(2)
    }
}));
export default Create;
