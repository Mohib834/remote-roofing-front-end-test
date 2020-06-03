import { UserAuthActionsTypes } from '../actions/types';
import { UserAuthStateTypes } from '../types';

const initState: UserAuthStateTypes = {
    user: null,
    isLoading: false,
    
    snackbar: {
        open:false,
        message: '',
        color: 'success',
    }
};

export default (state: UserAuthStateTypes = initState, action: UserAuthActionsTypes): UserAuthStateTypes => {
    switch (action.type){
        case "STORE_AUTH_USER":
            return {
                ...state,
                user: action.user
            };
        case "CHANGE_AUTH_LOADING_STATUS":
            return {
                ...state,
                isLoading: action.isLoading
            };
        case "SHOW_SNACKBAR":
            return {
                ...state,
                snackbar: action.snackbar
            };
    }

    return state;
};