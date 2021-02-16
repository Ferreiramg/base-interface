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

export function setError(error) {
  return addToast({ msg: error, severity: 'error' })
}

export default { addToast, removeToast, setError };