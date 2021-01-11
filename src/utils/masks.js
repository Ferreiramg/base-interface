
export const FILTER_NUMBER = /^[0-9]+$/;
export const FILTER_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
export const FILTER_FLOAT = /^(\d+(.\d{0,2})?|[.]?\d{1,2})$/;
export const FILTER_CLASS = /^[0-9.]*$/;
export const FILTER_STRING = /^[a-zA-Z\u00C0-\u00FF&._ ]*$/;
export const FILTER_DATE = /^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/g;
export const FILTER_CEP = /\d{5}-\d{3}/
export const FILTER_CNPJ = /^([0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}|[0-9]{2}.?[0-9]{3}.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/;

export function currencyFormat(num) {
    // return parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    return parseFloat(num).toLocaleString('pt-br', {minimumFractionDigits: 2}) //currency:'BRL'
}

export const mask = {
    conta: value => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{1})(\d)/, '$1.$2')
            .replace(/(\d{1})(\d)/, '$1.$2')
            .replace(/(\d{1})(\d)/, '$1.$2')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})\d+?$/, '$1')
    },
    cep: value => {
        return value
            .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero
            .replace(/(\d{5})(\d{3})/, '$1-$2')
    },
    numero: value => {
        return value
            .replace(/\D/g, '');
    },
    real: value => {
        return parseFloat(value).toFixed(2) // casas decimais
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
}

