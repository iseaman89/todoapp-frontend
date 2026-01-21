import api from './axios';

export const login = async (email, password) => {
    const { data } = await api.post('/Auth/login', { email, password });
    return data;
};

export const register = async payload => {
    const { data } = await api.post('/Auth/register', payload);
    return data;
};

export const refresh = async refreshToken => {
    const { data } = await api.post('/Auth/refresh', { refreshToken });
    return data;
};