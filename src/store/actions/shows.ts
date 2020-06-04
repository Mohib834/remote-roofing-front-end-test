
import rRApi from '../../api/rRApi';
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
            rRApi.get('')
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
        return new Promise(async (resolve,reject) => {
            try{
                // # Using Remote Roofing shows title in another api to fetch more detail about a show
                const res = await tmdbApi.get(`/search/${category}`, {
                    params: {
                        query: sName,
                        page: 1,
                    }
                });
                dispatch(fetchAShow());
                resolve(res.data.results[0]);
            }catch(err){
                dispatch(showSnackbar({
                    open: true,
                    color: 'error',
                    message: 'Something went wrong, try refreshing.',
                }));
                reject(err);
                console.log(err);
            }
        });
    };
};

export const startToggleWishlist = (sid: string, category: "tv" | "movie",  toggleAction: "add" | "remove") => {
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
    
                const newWishlist = {} as { movie: Array<string>; tv: Array<string> };

                // Copying the other category into the newWishlist object
                // Without this the category which is not choosen will not be there
                if(category === "movie"){
                    newWishlist.tv = wishlist.tv.map(s => s);
                } else {
                    newWishlist.movie = wishlist.movie.map(s => s);
                }
    
                if(toggleAction === 'add'){
                    // Adding the sid into the choosen category
                    // Add the new wishlist item to current wishlist
                    newWishlist[category] = wishlist[category]?.map(w => w);
                    newWishlist[category].push(sid);
                } else {
                    newWishlist[category] = wishlist[category]?.filter(id => id !== sid);
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

                // Snackbar
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

export const startFetchWishlistShows = () => {
    return (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<Array<{[key: string]: any}>> => {
        return new Promise(async (resolve, reject) => {
            try{
                const userWishlist = getState().userAuth.user?.wishlist;
                const promises: Array<Promise<{[key: string]: any}>> = [];

                

                // Fetching all the movies using movie id one by one and storing them in the promises Array
                if(userWishlist?.movie && userWishlist?.movie.length !== 0){
                   userWishlist.movie.forEach((mid) => {
                        const promise = (): Promise<{[key: string]: any}> => {
                            return new Promise((resolve, reject) => {
                                tmdbApi.get(`/movie/${mid}`)
                                .then(res => {
                                    resolve({ ...res.data, category: 'movie' });
                                })
                                .catch(err => reject(err));
                            }); 
                        };
                        promises.push(promise());
                    });
                } 

                if(userWishlist?.tv && userWishlist?.tv.length !== 0) {
                // Fetching all the series/tv using series/tv id one by one and storing them in the promises Array
                    userWishlist?.tv.forEach(tid => {
                        const promise = (): Promise<{[key: string]: any}> => {
                            return new Promise((resolve, reject) => {
                                tmdbApi.get(`/tv/${tid}`)
                                .then(res => resolve({ ...res.data, category: 'tv' }))
                                .catch(err => reject(err));
                            });
                        };
        
                        promises.push(promise());
                    });
                }
                // Waiting until all the promises gets resolves
                const wishlistShows = await Promise.all(promises);
                
                // Only saving the data, that is needed
                const wishlistShowsData = wishlistShows.map(s => {
                    return {
                        poster_path: s.poster_path, /* eslint-disable-line */ // (Not allowing camel_casing)
                        id: s.id, // sid
                        title: s.title || s.name, /* eslint-disable-line */ // title for movie, name for tv
                        category: s.category,
                    };
                });
                // sending the data to the component
                resolve(wishlistShowsData);

            } catch(err){
                dispatch(showSnackbar({
                    open: true,
                    message: "Something went wrong",
                    color: "error"
                }));
                console.log(err);
                reject(err);
            }
        });
    };
};

// # Not storing the shows data in the store because it is not required in any pages/container except shows container
// # Instead using promises to send the data to shows pages and storing it in local state.
// # Doing the same thing for "fetchAShow"