// We do this so that we don't do typos in writing types of a dispatch
const FETCH_MOVIES_DATA = "FETCH_MOVIES_DATA";
const CHANGE_LOADING_STATUS = "CHANGE_LOADING_STATUS"; 

// Fetch Movies ( outsourcing actions ) 
// each action in type format
export type FetchMoviesData = {
    type: typeof FETCH_MOVIES_DATA;
    moviesData: null | Array<{}>; // Data coming from action to reducer // Payload
}

export type ChangeLoadingStatus = {
    type: typeof CHANGE_LOADING_STATUS;
    isLoading: boolean;
}

// All Fetch Movies Actions into one FetchMoviesDataTypes
export type MoviesActionsTypes = FetchMoviesData | ChangeLoadingStatus

// Combining all the action from into one AppActions
export type AppActions = MoviesActionsTypes