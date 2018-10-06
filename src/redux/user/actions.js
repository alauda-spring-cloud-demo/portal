const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_STORE = "user/LOGIN_STORE";
const CHECK_AUTHORIZATION = "user/CHECK_AUTHORIZATION"
const LOGOUT = "user/LOGOUT";
const LOGIN = "user/LOGIN";
const CREATE_USER = "user/CREATE_USER";
const CLEAR_TOKEN = "user/CLEAR_TOKEN";

const loginStore = (userInfo)=>({
	type:LOGIN_STORE,
	userInfo
})

const loginSuccess = (userInfo)=>({
	type:LOGIN_SUCCESS,
	userInfo
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

const createUser = ({username,password,displayName,mail})=>({
	type:CREATE_USER,
	username,password,displayName,mail
})

const clearToken = ()=>({
	type:CLEAR_TOKEN
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

	createUser,
	CREATE_USER,

	clearToken,
	CLEAR_TOKEN
}

export default actions;