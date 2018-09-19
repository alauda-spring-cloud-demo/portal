
export function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('token_info');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function getCurrentUser() {
  return localStorage.getItem('token_info');
}