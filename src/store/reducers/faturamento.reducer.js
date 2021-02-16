import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    faturamentos: [],
    selected: {},
    faturamento: {},
    anexo_fob: "",
    data_fob: []
}

export function faturamentoReducer(state = initial_state, action) {

    switch (action.type) {
        case Type.FAT_CHECKOUT_READ:
        case Type.FAT_CHECKOUT_SAVE:
        case Type.FAT_LIST_ALL:
        case Type.FAT_DELETE:
        case Type.FAT_UPDATE:
        case Type.FAT_FOB:
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
        case Type.FAT_EXPORT_FOB_SUCCESS:
            return {
                ...state,
                anexo_fob: action.payload.bloburl,
                data_fob: action.payload.data,
                isLoading: false,
                error: null
            }
        case Type.FAT_EXPORT_FOB_CLEAN:
            return {
                ...state,
                anexo_fob: "",
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