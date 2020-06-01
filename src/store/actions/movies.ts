
import mviApi from '../../api/rRApi';
import { ChangeLoadingStatus, AppActions } from './types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { sortAndFilterShows } from '../../utils/helperFunctions';

// Action creators

// Dispatchs actions
const changeLoadingStatus = (payload: boolean): ChangeLoadingStatus  => {
    return {
        type:'CHANGE_LOADING_STATUS',
        isLoading: payload,
    };
};

const fetchShowsData = (): AppActions => ({
    type: "FETCH_SHOWS_DATA",
});


// Thunk Dispatch actions ( This is what we are going to use all over the components )
export const startFetchShowsData = (category: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<Array<{[key: string]: any}>> => {
        dispatch(changeLoadingStatus(true));
        return new Promise((resolve, reject) => {
            mviApi.get('')
            .then(response => {
                const allShows = response.data.entries as Array<{[key: string]: any; programType: string}>;
                
                let shows: Array<{[key: string]: any}>;
                // Showing relevant show category
                if(category === 'series'){
                    shows = allShows.filter( s => s.programType === 'series');
                } else {
                    shows = allShows.filter( s => s.programType === 'movie');
                }

                // Sorting and filtering
                shows = sortAndFilterShows(shows);

                // Dispatching
                dispatch(fetchShowsData());
                dispatch(changeLoadingStatus(false));

                // Sending the shows data.
                resolve(shows);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
        });
    };
};

// # Not storing the movies data in the store because it is not required in any pages/container except movies and series
// # Instead using promises to send the data to movies/series pages and storing it in local state.