// Using this Api over Remote Roofing api for additional Data
import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: process.env.REACT_APP_TMDB_API_KEY // eslint-disable-line
    },
    paramsSerializer: (params) => {
        // Sample implementation of query string building
        let result = '';
        Object.keys(params).forEach(key => {
            result += `${key}=${encodeURIComponent(params[key])}&`;
        });
        return result.substr(0, result.length - 1);
    }
});

export default tmdbApi;