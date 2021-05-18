import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as Type from 'utils/constants/actionTypes';

const { REACT_APP_API_URL } = process.env;

function* importConc(file) {
    const request = new Request(`${REACT_APP_API_URL}/upload.php`, {
        method: 'POST',
        body: file
    });
    try {
        const response = yield call(async () =>
            await fetch(request)
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        yield put({ type: Type.IMPORT_CONCILIACAO_SUCCESS, anexo: response.blob() });

    } catch (error) {
        yield put({ type: Type.GET_CONCILIACAO_FAILURE, error })
    }
};

export function* watcherSaga() {
    yield takeLatest(Type.GET_CONCILIACAO_IMPORT, importConc);
}