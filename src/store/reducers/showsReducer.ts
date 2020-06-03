import { ShowsActionsTypes } from '../actions/types';
import { ShowsStateTypes } from '../types';

const initState: ShowsStateTypes = {
    show: null,
};

export default (state: ShowsStateTypes = initState, action: ShowsActionsTypes): ShowsStateTypes => {

    switch (action.type){
        case "FETCH_SHOWS_DATA":
            return state;
        case "FETCH_A_SHOW":
            return state;
        case "ADD_A_SHOW_TO_WATCH_LIST":
            return {
                ...state,
                show: action.show
            };
    }

    return state;
};