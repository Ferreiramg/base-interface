import { combineReducers } from 'redux';

import { conciliacaoReducer } from './conciliacao.reducer';
import { faturamentoReducer } from './faturamento.reducer';
import { reportplotReducer } from './reportplot.reducer';
import { reducerImages } from './image.reducer.js';
import toasts from './notify.reducer';
import {errorReducer} from './errorhandler.reducer';


export const reducers = combineReducers({
    Conciliacao: conciliacaoReducer,
    Faturamento: faturamentoReducer,
    Plot: reportplotReducer,
    Images: reducerImages,
    toasts,
    errorReducer
});