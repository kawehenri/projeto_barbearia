export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setAuth = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const user = getUser();
  return user?.role === 'admin';
};

export const isBarber = () => {
  const user = getUser();
  return user?.role === 'barbeiro';
};

export const isCliente = () => {
  const user = getUser();
  return user?.role === 'cliente';
};

