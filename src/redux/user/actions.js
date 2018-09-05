const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_STORE = "user/LOGIN_STORE";
const CHECK_AUTHORIZATION = "user/CHECK_AUTHORIZATION"
const LOGOUT = "user/LOGOUT";
const LOGIN = "user/LOGIN";

const loginStore = ({token,userName,avata})=>({
	type:LOGIN_STORE,
	token,userName,avata
})

const loginSuccess = ({token,userName,avata})=>({
	type:LOGIN_SUCCESS,
	token,userName,avata
})

const checkAuthorization = ()=>({
	type:CHECK_AUTHORIZATION
})

const login = (loginName,password)=>({
	type:LOGIN,
	loginName,password
})

const logout = ()=>({
	type:LOGOUT
})

const actions = {

	LOGIN_STORE,
	loginStore,

	LOGIN_SUCCESS,
	loginSuccess,

	CHECK_AUTHORIZATION,
	checkAuthorization,

	LOGOUT,
	logout,

	LOGIN,
	login,
}

export default actions;