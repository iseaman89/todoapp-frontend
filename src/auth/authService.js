let onTokenRefresh = null;
let onLogout = null;

export const authService = {
    setTokenRefreshHandler(fn) {
        onTokenRefresh = fn;
    },
    setLogoutHandler(fn) {
        onLogout = fn;
    },
    tokenRefreshed(token, expiration) {
        onTokenRefresh?.(token, expiration);
    },
    logout() {
        onLogout?.();
    }
};