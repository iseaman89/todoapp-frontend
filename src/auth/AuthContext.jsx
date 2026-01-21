import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { authService } from "./authService.js";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');
        const refreshToken = sessionStorage.getItem('refreshToken');
        const accessTokenExpiration = sessionStorage.getItem('accessTokenExpiration');
        const user = localStorage.getItem('user');

        if (!accessToken || !refreshToken || !accessTokenExpiration || !user) {
            setIsAuthChecked(true);
            return;
        }

        const isExpired =
            new Date(accessTokenExpiration).getTime() < Date.now();

        if (isExpired) {
            setIsAuthChecked(true);
            return;
        }

        setAuthData({
            accessToken,
            refreshToken,
            user: JSON.parse(user),
        });

        setIsAuthChecked(true);
    }, []);  

    const authLogin = (data) => {
        const { tokens, user } = data;
        
        sessionStorage.setItem('accessToken', tokens.accessToken);
        sessionStorage.setItem('refreshToken', tokens.refreshToken);
        sessionStorage.setItem('accessTokenExpiration', tokens.accessTokenExpiration);

        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthData({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user,
        });
        
        navigate('/todo');
    };

    const clearAuth = () => {
        sessionStorage.clear();
        localStorage.removeItem('user');
        setAuthData(null);
    };

    const logout = () => {
        clearAuth();
        navigate('/login');
    };

    const updateAccessToken = (accessToken, accessTokenExpiration) => {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('accessTokenExpiration', accessTokenExpiration);

        setAuthData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                accessToken
            };
        });
    };

    useEffect(() => {
        authService.setTokenRefreshHandler(updateAccessToken);
        authService.setLogoutHandler(logout);
    }, []);

    return (
        <AuthContext.Provider value={{ authData, isAuthChecked, authLogin, logout, updateAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};