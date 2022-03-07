import axios from 'axios';

const api = axios.create({
    baseURL:'https://productlist.42web.io',
});

export default api;