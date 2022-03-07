import axios from 'axios';

const api = axios.create({
    baseURL:'https://productlist43.000webhostapp.com/',
});

export default api;