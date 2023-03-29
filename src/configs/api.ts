import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { host } from './constants';

const api = axios.create({
    baseURL: host,
});

api.interceptors.request.use((request: InternalAxiosRequestConfig<any>) => {
    request.headers.set('content-type', 'application/json');
    return request;
});

api.interceptors.response.use(
    (response: AxiosResponse<any>) => response,
    (response: AxiosError) => response.response
);

export default api;
