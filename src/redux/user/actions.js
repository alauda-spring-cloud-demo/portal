const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_STORE = "user/LOGIN_STORE";
const CHECK_AUTHORIZATION = "user/CHECK_AUTHORIZATION"
const LOGOUT = "user/LOGOUT";
const LOGIN = "user/LOGIN";
const CREATE_USER = "user/CREATE_USER";
const CLEAR_TOKEN = "user/CLEAR_TOKEN";
const GET_ALL_USERS = "user/GET_ALL_USERS";
const GET_ALL_USERS_SUCCESS = "user/GET_ALL_USERS_SUCCESS";
const UPDATE_USER = "user/UPDATE_USER";
const UPDATE_USER_SUCCESS = "user/UPDATE_USER_SUCCESS";

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

const getAllUsers = ({page,size})=>({
	type:GET_ALL_USERS,
	page,size
})

const getAllUsersSuccess = ({allUsers})=>({
	type:GET_ALL_USERS_SUCCESS,
	allUsers
})

const updateUser = (user)=>({
	type:UPDATE_USER,
	user
})

const updateUserSuccess = (user)=>({
	type:UPDATE_USER_SUCCESS,
	user
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
	CLEAR_TOKEN,

	getAllUsers,
	GET_ALL_USERS,

	getAllUsersSuccess,
	GET_ALL_USERS_SUCCESS,

	updateUser,
	UPDATE_USER,

	updateUserSuccess,
	UPDATE_USER_SUCCESS
}

export default actions;