import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    faturamentos: [],
    selected: {},
    faturamento: {}
}

export function faturamentoReducer(state = initial_state, action) {

    switch (action.type) {
        case Type.FAT_EXPORT_FOB:
            return state;
        case Type.FAT_CHECKOUT_READ:
        case Type.FAT_CHECKOUT_SAVE:
        case Type.FAT_LIST_ALL:
        case Type.FAT_DELETE:
        case Type.FAT_UPDATE:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case Type.FAT_SELECT_EDIT:
            return {
                ...state,
                selected: action.payload,
                isLoading: false,
                error: null
            };
        case Type.FAT_LIST_SUCCESS:
            return {
                ...state,
                faturamentos: action.payload,
                isLoading: false,
                error: null
            }
        case Type.FAT_CHECKOUT_SUCCESS:
            return {
                ...state,
                faturamento: action.payload,
                isLoading: false,
                error: null
            };
        case Type.FAT_UPDATE_SUCCESS:
            return {
                selected: {},
                faturamento: {},
                faturamentos: [],
                isLoading: false,
                error: null
            };
        case Type.FAT_DELETE_SUCCESS:
            return {
                ...state,
                faturamentos: state.faturamentos.filter(i => +i[0] !== +action.id),
                selected: {},
                isLoading: false,
                error: null
            }
        case Type.REQUEST_FAT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        default:
            return state;
    }
}