import createToast from "factories";
import { ADD_TOAST, REMOVE_TOAST } from "utils/constants/actionTypes";

export function addToast(options = {}) {
  return {
    payload: createToast(options),
    type: ADD_TOAST
  };
}

export function removeToast(id) {
  return {
    payload: id,
    type: REMOVE_TOAST
  };
}

export default { addToast, removeToast };