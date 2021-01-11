import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as Type from 'utils/constants/actionTypes';

function unpack(rows, key) {
    return rows.map((row) => row[key]);
}
function* plotFaturamento() {
    try {
        const { faturamentos } = yield select(({ Faturamento }) => Faturamento);
        if (faturamentos.length === 0)
            yield put({ type: Type.FAT_LIST_ALL });

        const data1 = yield call(async () => ({
            type: "bar",
            mode: "lines",
            name: 'Valor Faturamento',
            x: unpack(faturamentos, 5),
            y: unpack(faturamentos, 1),
            line: { color: '#17BECF' }
        }));

        yield put({ type: Type.PLOT_FAT_TIMESERIES, payload: [data1] });

    } catch (error) {

    }

}
export function* watcherSaga() {
    yield takeLatest(Type.GET_PLOT_FAT_TIMESERIES, plotFaturamento);

}