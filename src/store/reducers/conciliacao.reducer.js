import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    data: [],
    menuItens: [],
    anexo: {}
}

export function conciliacaoReducer(state = initial_state, action) {

    switch (action.type) {
        case Type.LIST_CONCILIACAO:
        case Type.GET_CONCILIACAO:
            return {
                ...state,
                isLoading: true
            }
        case Type.GET_CONCILIACAO_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case Type.RESET_CONCILIACAO:
            return {
                ...state,
                data: [],
                anexo: {},
                isLoading: false
            }
        case Type.LIST_CONCILIACAO_SUCCESS:
            return {
                ...state,
                menuItens: action.payload,
                isLoading: false
            }
        case Type.IMPORT_CONCILIACAO:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case Type.IMPORT_CONCILIACAO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                anexo: action.payload
            }
        case Type.REQUEST_CONCILIACAO_FAILURE:
            return {
                ...initial_state,
                error: action.error
            }
        default:
            return state;
    }
};