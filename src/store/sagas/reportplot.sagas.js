import { takeLatest, put, call, select } from 'redux-saga/effects';
import * as Type from 'utils/constants/actionTypes';

function unpack(rows, key) {
    return rows.map((row) => row[key]);
}

function group(data) {
    const result = Object.values(

        data.reduce((r, o) => {
            let d = o[5].split('-');
            let y = `${d[1]}${d[0]}`;
            return r[y]
                ? r[y][1] += parseFloat(o[1])//soma
                : (r[y] = [y, parseFloat(o[1])]), r

        }, {})
    );
    return result;
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

        console.log(group(faturamentos));
        yield put({ type: Type.PLOT_FAT_TIMESERIES, payload: [data1] });

    } catch (error) {
        console.log(error);
    }

}
export function* watcherSaga() {
    yield takeLatest(Type.GET_PLOT_FAT_TIMESERIES, plotFaturamento);

}