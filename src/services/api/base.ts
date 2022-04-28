import axios from 'axios';
import { getLocalToken } from '../token';

const baseURL = isLocal() ? 'http://localhost:5001' : 'https://projectmanagerv2.herokuapp.com';

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

function isLocal() {

    const { hostname } = window.location;
    return hostname === 'localhost' || hostname === '127.0.0.1';
};
