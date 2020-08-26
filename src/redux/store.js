import {
    compose,
    createStore,
    applyMiddleware
} from 'redux'
import {
    persistStore
} from 'redux-persist'

import thunk from 'redux-thunk';

import rootReducer from './root-reducer'

const middleware = [thunk];

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


export const persistor = persistStore(store)