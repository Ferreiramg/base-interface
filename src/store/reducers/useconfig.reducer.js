import * as Type from "utils/constants/actionTypes";
const initial_state = {
        currentTheme: localStorage.getItem('appTheme') || 'normal'
};

export function useconfigReducer(state = initial_state, action) {
    switch (action.type) {
        case Type.SET_THEME_COLOR:
            localStorage.setItem('appTheme', action.payload)
            return {
                 currentTheme: action.payload 
            }

        default:
            return state;
    }
}