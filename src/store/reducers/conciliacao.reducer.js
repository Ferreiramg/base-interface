import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    data: [],
    anexo: []
}

export function conciliacaoReducer(state = initial_state, action) {

    switch (action.Type) {
        case Type.GET_CONCILIACAO:
            return {
                ...state,
                isLoading: true
            }
        case Type.GET_CONCILIACAO_IMPORT:
            return {
                ...state,
                error: null,
                isLoading: true
            }
        case Type.IMPORT_CONCILIACAO_SUCCESS:
            return {
                ...state,
                isLoading: true,
                anexo: action.payload
            }
        case Type.GET_CONCILIACAO_SUCCESS:
            return {
                isLoading: false,
                error: null,
                data: action.payload
            }
        case Type.GET_CONCILIACAO_FAILURE:
            return {
                ...initial_state,
                error: action.error
            }
        default:
            return initial_state;
    }
};