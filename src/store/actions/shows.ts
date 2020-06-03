
import mviApi from '../../api/rRApi';
import tmdbApi from '../../api/tmdbApi';
import { AppActions } from './types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { sortAndFilterShows } from '../../utils/helperFunctions';

// Action creators

// Dispatchs actions
const fetchShowsData = (): AppActions => ({
    type: "FETCH_SHOWS_DATA",
});

const fetchAShow = (): AppActions => ({
    type: "FETCH_A_SHOW"
});


// Thunk Dispatch actions ( This is what we are going to use all over the components )
export const startFetchShowsData = (category: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<Array<{[key: string]: any}>> => {
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

export const startFetchAShow = (sName: string, category: 'tv' | 'movie') => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<{[key: string]: any}> => {
        return new Promise((resolve,reject) => {
            // # Using Remote Roofing shows title in another api to fetch more detail about a show
            tmdbApi.get(`/search/${category}`, {
                params: {
                    query: sName,
                    page: 1,
                }
            }).then(res => {
                dispatch(fetchAShow());
                resolve(res.data.results[0]);
            }).catch(err => {
                reject(err);
                console.log(err);
            });
        });
    };
};



// # Not storing the shows data in the store because it is not required in any pages/container except shows container
// # Instead using promises to send the data to shows pages and storing it in local state.
// # Doing the same thing for "fetchAShow"