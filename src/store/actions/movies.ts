
import mviApi from '../../api/movieApi';
import { ChangeLoadingStatus, AppActions } from './types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { AxiosResponse } from 'axios';
// import { AppActions } from "./types";
// Action creators

// Dispatchs actions
const changeLoadingStatus = (payload: boolean): ChangeLoadingStatus  => {
    return {
        type:'CHANGE_LOADING_STATUS',
        isLoading: payload,
    };
};

const fetchMoviesData = (response: AxiosResponse): AppActions => ({
    type: "FETCH_MOVIES_DATA",
    moviesData: response.data.entries,
});


// Thunk Dispatch actions ( This is what we are going to use all over the components )
export const startFetchMoviesData = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
        mviApi.get('')
        .then(response => {
            dispatch(fetchMoviesData(response));
            dispatch(changeLoadingStatus(false));
        })
        .catch(err => {
            console.log(err);
        });
    };
};