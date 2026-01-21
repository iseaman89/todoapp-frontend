export const logoutHard = () => {
    sessionStorage.clear();
    localStorage.removeItem('user');
    window.location.href = '/login';
};