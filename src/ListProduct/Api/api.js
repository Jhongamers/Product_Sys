import axios from 'axios';

const api = axios.create({
    baseURL:'http://productlist.42web.io',
});

export default api;