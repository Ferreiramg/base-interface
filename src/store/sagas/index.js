
import { all } from 'redux-saga/effects';
import * as Conciliacao from './conciliacao.sagas';
//import * as Notification from './notification.sagas';

function* Sagas() {
  yield all([
    Conciliacao.watcherSaga()
  ]);
}

export default Sagas;