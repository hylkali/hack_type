export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (t) => localStorage.setItem('token', t);
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
};
export const logout = () => {
  clearAuth();
  window.location.href = '/login';
};