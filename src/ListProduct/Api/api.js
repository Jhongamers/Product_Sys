import axios from 'axios';

const api = axios.create({
    baseURL:'//productlist.42web.io',
});

export default api;