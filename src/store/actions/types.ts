// We do this so that we don't do typos in writing types of a dispatch
const FETCH_SHOWS_DATA = "FETCH_SHOWS_DATA";
const FETCH_A_SHOW = "FETCH_A_SHOW"; 
const CHANGE_LOADING_STATUS = "CHANGE_LOADING_STATUS"; 

const CHANGE_AUTH_LOADING_STATUS = "CHANGE_AUTH_LOADING_STATUS"; 
const STORE_AUTH_USER = "STORE_AUTH_USER";
const SHOW_SNACKBAR = "SHOW_SNACKBAR";


// ===== Shows Actions =====
export type FetchShowsData = {
    type: typeof FETCH_SHOWS_DATA;
}

export type ChangeLoadingStatus = {
    type: typeof CHANGE_LOADING_STATUS;
    isLoading: boolean;
}

export type FetchAShow = {
    type: typeof FETCH_A_SHOW;
}

// ===== User Auth =====

export type StoreAuthUser = {
    type: typeof STORE_AUTH_USER;
    user: string | null;
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
export type ShowsActionsTypes = FetchShowsData | ChangeLoadingStatus | FetchAShow
export type UserAuthActionsTypes = StoreAuthUser | ChangeAuthLoadingStatus | ShowSnackbar

// Combining all the action from into one AppActions
export type AppActions = ShowsActionsTypes | UserAuthActionsTypes;