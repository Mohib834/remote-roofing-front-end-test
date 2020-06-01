import { combineReducers } from 'redux';
import showsReducers from './showsReducer';
import userAuthReducer from './userAuthReducer';

// All store reducer modules pass through one reducer
const rootReducer = combineReducers({
    shows: showsReducers,
    userAuth: userAuthReducer
});

export type AppState = ReturnType<typeof rootReducer> 

export default rootReducer;