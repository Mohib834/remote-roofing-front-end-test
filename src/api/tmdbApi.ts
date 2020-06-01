// Using this Api over Remote Roofing api for additional Data
import axios from 'axios';

const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default tmdbApi;