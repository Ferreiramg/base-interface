import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducers } from './reducers';
import Sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = ({getState}) => next => action => {
    console.log(getState());
    return next(action)
};

const composeEnhancers =
    (typeof window !== undefined &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(Sagas);
export default store;