import { ADD_TOAST, REMOVE_TOAST, SHOW_TOAST, CLOSE_TOAST } from "utils/constants/actionTypes";

export default function toasts(state = [], action) {
  const { payload, type } = action;

  switch (type) {
    case SHOW_TOAST:
    case CLOSE_TOAST:
      return state;
    case ADD_TOAST:
      return [payload, ...state];

    case REMOVE_TOAST:
      return state.filter(toast => toast.id !== payload);

    default:
      return state;
  }
}