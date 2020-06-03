
import mviApi from '../../api/rRApi';
import tmdbApi from '../../api/tmdbApi';
import { AppActions } from './types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { sortAndFilterShows } from '../../utils/helperFunctions';
import firebase from 'firebase';
import { showSnackbar } from './userAuth';

const db = firebase.firestore();

// Action creators

// Dispatchs actions
export const fetchShowsData = (): AppActions => ({
    type: "FETCH_SHOWS_DATA",
});

export const fetchAShow = (): AppActions => ({
    type: "FETCH_A_SHOW"
});

export const addAShowToWatchList = (show: {sid: string} | null): AppActions => ({
    type: "ADD_A_SHOW_TO_WATCH_LIST",
    show,
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

export const startAddAShowToWishList = (sid: string) => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        return new Promise((resolve, reject) => {
            // get the current user uid
            const uid = getState().userAuth.user?.uid;

            // # Firebase
            // Create the user with uid and store the sid in user wishlist property in the document
            db.collection('users').doc(uid).update({
                wishlist: firebase.firestore.FieldValue.arrayUnion(sid)
            })
            .then(() => {
                dispatch(showSnackbar({
                    open: true,
                    color: 'success',
                    message: 'Added to wishlist'
                }));
                resolve();
            })
            .catch(err => {
                dispatch(showSnackbar({
                    open: true,
                    color: 'error',
                    message: 'Show didn\'t add to wishlist, Try again'
                }));
                console.log(reject);
                reject(err);
            });
        });
    };
};

// # Not storing the shows data in the store because it is not required in any pages/container except shows container
// # Instead using promises to send the data to shows pages and storing it in local state.
// # Doing the same thing for "fetchAShow"