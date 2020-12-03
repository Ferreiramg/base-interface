import { combineReducers } from 'redux';

import { conciliacaoReducer } from './conciliacao.reducer';


export const reducers = combineReducers({
    Conciliacao: conciliacaoReducer,

    notification: (state, action) => {
        switch (action.type) {
            case 'notification':
                return { ...state, show: true, msg: action.msg, severity: action.severity }
            case 'notifcation_close':
                return { ...state, show: false };
            default:
                return { ...state, show: false };
        }
    }
});