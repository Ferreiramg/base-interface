import { takeLatest, put, call } from 'redux-saga/effects';
import api from 'utils/http.intercept';
import * as Type from 'utils/constants/actionTypes';

function* checkout({ payload }) {
    try {
        let { data } = yield call(async () => await api.post('/faturamento/checkout', payload));
        yield put({ type: Type.FAT_CHECKOUT_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: Type.REQUEST_FAT_FAILURE, error })
    }
};
function* listAll() {
    try {
        let { data } = yield call(async () => await api.get('/faturamento/checkout'));
        yield put({ type: Type.FAT_LIST_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: Type.REQUEST_FAT_FAILURE, error })
    }
};
function* checkoutRead({ path }) {
    try {
        let { data } = yield call(async () => await api.get(`/faturamento/checkout/${path}`));
        yield put({ type: Type.FAT_CHECKOUT_SUCCESS, payload: data });
    } catch (error) {
        yield put({ type: Type.REQUEST_FAT_FAILURE, error })
    }
};
function* updateFaturamento({ payload }) {
    try {
        yield call(async () => await api.put(`/faturamento`, payload));
        yield put({ type: Type.FAT_UPDATE_SUCCESS });
    } catch (error) {
        yield put({ type: Type.REQUEST_FAT_FAILURE, error })
    }
};

function* deleteFaturamento({ id }) {
    try {
        let { data } = yield call(async () => await api.get(`/faturamento/delete/${id}`));
        yield put({ type: Type.FAT_DELETE_SUCCESS, id: data.id });
    } catch (error) {
        yield put({ type: Type.REQUEST_FAT_FAILURE, error })
    }
}

export function* watcherSaga() {
    yield takeLatest(Type.FAT_CHECKOUT_SAVE, checkout);
    yield takeLatest(Type.FAT_CHECKOUT_READ, checkoutRead);
    yield takeLatest(Type.FAT_LIST_ALL, listAll);
    yield takeLatest(Type.FAT_UPDATE, updateFaturamento);
    yield takeLatest(Type.FAT_DELETE, deleteFaturamento);

}