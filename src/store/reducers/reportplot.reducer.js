import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    timeseries_faturamento: [],
}

export function reportplotReducer(state = initial_state, actions) {

    switch (actions.type) {
        case Type.GET_PLOT_FAT_TIMESERIES:
            return { ...state, isLoading: true, error: null };
        case Type.PLOT_FAT_TIMESERIES:
            return {
                ...state,
                isLoading: false,
                timeseries_faturamento: actions.payload
            }
        default:
            return state;
    }
}