import * as Type from "utils/constants/actionTypes";
const initial_state = {
    error: null,
    isLoading: false,
    capturedImage: {},
    images: [],
    progress: 0
};

export function reducerImages(state = initial_state, { type, payload }) {
    switch (type) {
        case Type.CAPTURE_IMAGE:
            return {
                ...state,
                isLoading: true
            };
        case Type.STORE_IMAGE_SUCCESS:
            return {
                error: null,
                isLoading: false,
                capturedImage: payload
            }
        case Type.UPLOAD_IMAGE_PROGRESS:
            return {
                ...state,
                progress:payload
            }
        case Type.STORE_IMAGE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload.error
            }
        default:
            return state;
    }
}