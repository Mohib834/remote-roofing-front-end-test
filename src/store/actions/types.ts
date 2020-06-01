// We do this so that we don't do typos in writing types of a dispatch
const FETCH_SHOWS_DATA = "FETCH_SHOWS_DATA";
const FETCH_A_SHOW = "FETCH_A_SHOW"; 
const CHANGE_LOADING_STATUS = "CHANGE_LOADING_STATUS"; 

// Fetch Shows ( outsourcing actions ) 
// each action in type format
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

// All Fetch Shows Actions into one FetchShowsDataTypes
export type ShowsActionsTypes = FetchShowsData | ChangeLoadingStatus | FetchAShow

// Combining all the action from into one AppActions
export type AppActions = ShowsActionsTypes