import { ShowsActionsTypes } from '../actions/types';
import { ShowsStateTypes } from '../types';

const initState: ShowsStateTypes = {
    isLoading: true,
};

export default (state: ShowsStateTypes = initState, action: ShowsActionsTypes): ShowsStateTypes => {

    switch (action.type){
        case "FETCH_SHOWS_DATA":
            return state;
        case "CHANGE_LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading
            };
    }

    return state;
};