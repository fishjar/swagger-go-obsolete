export function getAuthtoken(authtoken) {
  return localStorage.getItem('authtoken') || '';
}

export function setAuthtoken(authtoken) {
  return localStorage.setItem('authtoken', authtoken || '');
}
