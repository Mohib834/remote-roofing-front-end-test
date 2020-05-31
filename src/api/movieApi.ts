import axios from 'axios';

const mviApi = axios.create({
    baseURL: 'https://raw.githubusercontent.com/StreamCo/react-coding-challenge/master/feed/sample.json'
});

export default mviApi;