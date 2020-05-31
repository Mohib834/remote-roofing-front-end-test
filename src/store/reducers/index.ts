import { combineReducers } from 'redux';
import moviesReducers from './moviesReducer';

// All store reducer modules pass through one reducer
const rootReducer = combineReducers({
    movies: moviesReducers,
});

export type AppState = ReturnType<typeof rootReducer> 

export default rootReducer;