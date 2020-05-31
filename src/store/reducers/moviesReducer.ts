import { MoviesActionsTypes } from '../actions/types';
import { MoviesStateTypes } from '../types';

const initState: MoviesStateTypes = {
    moviesData: null,
    isLoading: true,
};

export default (state: MoviesStateTypes = initState, action: MoviesActionsTypes): MoviesStateTypes => {

    switch (action.type){
        case "FETCH_MOVIES_DATA":
            return {
                ...state,
                moviesData: action.moviesData,
            };
        case "CHANGE_LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading
            };
    }

    return state;
};