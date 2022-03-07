import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost/listproducts',
});

export default api;