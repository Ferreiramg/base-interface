
import { all } from 'redux-saga/effects';
import * as Conciliacao from './conciliacao.sagas';
import * as Faturamento from './faturamento.saga';
import * as Plot from './reportplot.sagas';

function* Sagas() {
  yield all([
    Conciliacao.watcherSaga(),
    Faturamento.watcherSaga(),
    Plot.watcherSaga()
  ]);
}

export default Sagas;