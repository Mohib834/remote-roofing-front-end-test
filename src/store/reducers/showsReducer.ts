import { ShowsActionsTypes } from '../actions/types';
import { ShowsStateTypes } from '../types';

const initState: ShowsStateTypes = {
    
};

export default (state: ShowsStateTypes = initState, action: ShowsActionsTypes): ShowsStateTypes => {

    switch (action.type){
        case "FETCH_SHOWS_DATA":
            return state;
        case "FETCH_A_SHOW":
            return state;
    }

    return state;
};