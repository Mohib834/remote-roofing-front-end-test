import { createStore, applyMiddleware, compose } from 'redux';
import reducer, { AppState } from './reducers/index';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { AppActions } from './actions/types';

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
));

export default store;