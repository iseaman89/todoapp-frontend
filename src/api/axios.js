import axios from 'axios';
import { authService } from '../auth/authService';
import { refresh } from "./auth.api.js";

const apiUrl = "http://localhost:7095/api";

const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
});

api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('accessToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(p =>
        error ? p.reject(error) : p.resolve(token)
    );
    failedQueue = [];
};

api.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token) => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            resolve(api(originalRequest));
                        },
                        reject
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await refresh();

                const { accessToken, accessTokenExpiration } = data.tokens;
                
                authService.tokenRefreshed(
                    accessToken,
                    accessTokenExpiration
                );

                processQueue(null, accessToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);

            } catch (err) {
                processQueue(err);
                authService.logout();
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
