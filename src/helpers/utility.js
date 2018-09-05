
export function clearToken() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}