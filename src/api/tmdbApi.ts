// Using this Api over Remote Roofing api for additional Data
import axios from 'axios';
import { tmdbApiKey } from '../firebase/env';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: tmdbApiKey // eslint-disable-line
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