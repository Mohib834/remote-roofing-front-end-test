import { combineReducers } from 'redux';
import showsReducers from './showsReducer';

// All store reducer modules pass through one reducer
const rootReducer = combineReducers({
    shows: showsReducers,
});

export type AppState = ReturnType<typeof rootReducer> 

export default rootReducer;