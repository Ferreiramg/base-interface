import { combineReducers } from 'redux';

import { conciliacaoReducer } from './conciliacao.reducer';
import { faturamentoReducer } from './faturamento.reducer';
import { reportplotReducer } from './reportplot.reducer';
import  toasts  from './notify.reducer';


export const reducers = combineReducers({
    Conciliacao: conciliacaoReducer,
    Faturamento: faturamentoReducer,
    Plot: reportplotReducer,
    toasts
});