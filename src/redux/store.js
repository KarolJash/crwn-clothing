import {
    compose,
    createStore,
    applyMiddleware
} from 'redux'
import {
    persistStore
} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './root-saga'

import rootReducer from './root-reducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];

const dev = () => {
    // allows us to use the redux dev tools middleware (only in development)
    if (process.env.NODE_ENV === 'development') {
        return compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    }
    return applyMiddleware(...middleware);
};

export const store = createStore(rootReducer, dev());

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)