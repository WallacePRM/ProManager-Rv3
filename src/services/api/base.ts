import axios from 'axios';
import { getLocalToken } from '../token';

const baseURL = 'http://localhost:5001';

export const authAxios = axios.create({
    baseURL,
});

authAxios.interceptors.request.use(config => {
    if (config.headers && !config.headers.Authorization) {
        config.headers.Authorization = getLocalToken() || '';
    }

    return config;
});

// Public
export const publicAxios = axios.create({
    baseURL,
});
