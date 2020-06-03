
import mviApi from '../../api/rRApi';
import tmdbApi from '../../api/tmdbApi';
import { AppActions } from './types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';
import { sortAndFilterShows } from '../../utils/helperFunctions';
import firebase from 'firebase';
import { showSnackbar, storeAuthUser } from './userAuth';

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
                dispatch(showSnackbar({
                    open: true,
                    color: 'error',
                    message: 'Seems like you got disconnected.',
                }));
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

export const startToggleWishlist = (sid: string, toggleAction: "add" | "remove") => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<unknown> => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = getState().userAuth.user;
                // If user is not logged in
                if(!user){
                    throw new Error("no-authentication");
                }
    
                // Get the current user uid and wishlist from store
                const { uid, wishlist, name } = getState().userAuth.user!;
    
                let newWishlist: Array<string>;
    
                if(toggleAction === 'add'){
                    // Add the new wishlist item to current wishlist
                    newWishlist = wishlist?.map(w => w);
                    newWishlist.push(sid);
                } else {
                    newWishlist = wishlist?.filter(id => id !== sid);
                }
                // # Firebase
                // Get the user with uid and store the sid in user wishlist property in the document
                await db.collection('users').doc(uid).update({
                    wishlist: newWishlist
                });
            
                // Update the store with the new wishlist
                dispatch(storeAuthUser({
                    uid,
                    name,
                    wishlist: newWishlist,
                }));

                let snackbarMessage = 'Added to wishlist';

                if(toggleAction === 'remove'){
                    snackbarMessage = 'Removed from wishlist';
                }

                dispatch(showSnackbar({
                    open: true,
                    color: 'success',
                    message: snackbarMessage,
                }));
                
                resolve();
            }catch(err){
                let message = 'Show didn\'t add to wishlist, Try again';

                if(err.message === 'no-authentication'){
                    message = 'You need to login in order to bookmark';
                }

                dispatch(showSnackbar({
                    open: true,
                    color: 'error',
                    message: message,
                }));

                reject(err);
            }
        });
    };
};

// # Not storing the shows data in the store because it is not required in any pages/container except shows container
// # Instead using promises to send the data to shows pages and storing it in local state.
// # Doing the same thing for "fetchAShow"