import { InternalAxiosRequestConfig } from './../../node_modules/axios/index.d';
import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json'
    },
    paramsSerializer: {
        serialize: (params: Record<string, any>) => queryString.stringify(params)
    }
});

axiosClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        if (axios.isAxiosError(err)) {
            return Promise.reject(err.response?.data);
        }
        return Promise.reject(err);
    }
);

export default axiosClient;
