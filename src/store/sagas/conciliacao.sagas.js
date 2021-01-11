import { takeLatest, put, call } from 'redux-saga/effects';

import api from 'utils/http.intercept';

import * as Type from 'utils/constants/actionTypes';

function* importConc({ form }) {

    try {
        let { data } = yield call(async () => await api.post('/conciliacao', form, { responseType: 'blob' }));
        const responseBlob = yield call(() => new Blob([data]));

        yield put({ type: Type.IMPORT_CONCILIACAO_SUCCESS, payload: URL.createObjectURL(responseBlob) });

    } catch (error) {
        yield put({ type: Type.REQUEST_CONCILIACAO_FAILURE, error })
    }
};
function* listConc() {

    try {
        let { data } = yield call(async () => await api.get('/conciliacao/menu'));
        yield put({ type: Type.LIST_CONCILIACAO_SUCCESS, payload: data });

    } catch (error) {
        yield put({ type: Type.REQUEST_CONCILIACAO_FAILURE, error });
    }
};
function* getConc({ payload }) {
    try {
        let { data } = yield call(async () => await api.get(`/conciliacao/view/${payload}`));
        yield put({ type: Type.GET_CONCILIACAO_SUCCESS, payload: data });

    } catch (error) {
        yield put({ type: Type.REQUEST_CONCILIACAO_FAILURE, error });
    }
};

export function* watcherSaga() {
    yield takeLatest(Type.IMPORT_CONCILIACAO, importConc);
    yield takeLatest(Type.LIST_CONCILIACAO, listConc);
    yield takeLatest(Type.GET_CONCILIACAO, getConc);
}