// We do this so that we don't do typos in writing types of a dispatch
const FETCH_SHOWS_DATA = "FETCH_SHOWS_DATA";
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

// All Fetch Shows Actions into one FetchShowsDataTypes
export type ShowsActionsTypes = FetchShowsData | ChangeLoadingStatus

// Combining all the action from into one AppActions
export type AppActions = ShowsActionsTypes