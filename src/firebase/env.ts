import * as functions from 'firebase-functions';

export const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY || functions.config().tmdb.apikey;
export const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY || functions.config().f.apikey;