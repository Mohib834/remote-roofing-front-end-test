import { User } from "store/types";

// We do this so that we don't do typos in writing types of a dispatch
const FETCH_SHOWS_DATA = "FETCH_SHOWS_DATA";
const FETCH_A_SHOW = "FETCH_A_SHOW"; 
const ADD_A_SHOW_TO_WATCH_LIST = "ADD_A_SHOW_TO_WATCH_LIST"; 

const CHANGE_AUTH_LOADING_STATUS = "CHANGE_AUTH_LOADING_STATUS"; 
const STORE_AUTH_USER = "STORE_AUTH_USER";
const SHOW_SNACKBAR = "SHOW_SNACKBAR";
const SET_USER_LOGGED_IN_STATUS = "SET_USER_LOGGED_IN_STATUS";


// ===== Shows Actions =====
export type FetchShowsData = {
    type: typeof FETCH_SHOWS_DATA;
}

export type FetchAShow = {
    type: typeof FETCH_A_SHOW;
}

export type AddAShowToWatchList = {
    type: typeof ADD_A_SHOW_TO_WATCH_LIST;
    show: {
        sid: string;
    } | null;
}

// ===== User Auth =====

export type SetUserLoggedInStatus = {
    type: typeof SET_USER_LOGGED_IN_STATUS;
    setUserLoggedInStatus: boolean;
}

export type StoreAuthUser = {
    type: typeof STORE_AUTH_USER;
    user: User;
}

export type ChangeAuthLoadingStatus = {
    type: typeof CHANGE_AUTH_LOADING_STATUS;
    isLoading: boolean;
}

export type ShowSnackbar = {
    type: typeof SHOW_SNACKBAR;
    snackbar: {
        open: boolean;
        message: string;
        color: "success" | "info" | "warning" | "error";
    };
}


// All Fetch Shows Actions into one FetchShowsDataTypes
export type ShowsActionsTypes = FetchShowsData | FetchAShow | AddAShowToWatchList
export type UserAuthActionsTypes = StoreAuthUser | ChangeAuthLoadingStatus | ShowSnackbar | SetUserLoggedInStatus

// Combining all the action from into one AppActions
export type AppActions = ShowsActionsTypes | UserAuthActionsTypes;