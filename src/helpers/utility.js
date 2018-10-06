
export function clearToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_info');
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  return localStorage.setItem('token',token);
}

export function getCurrentUser() {
	let userInfo = localStorage.getItem('user_info');
	if(userInfo){
		return JSON.parse(userInfo);
	}
}

export function setCurrentUser(userInfo) {
	localStorage.setItem('user_info',JSON.stringify(userInfo));
}