import actions from "./actions";

const initState = {currentUser:{},allUsers:{content:[]}}

const reducer = (state = initState,action)=>{
	switch(action.type){
		case actions.LOGIN_SUCCESS:
		case actions.LOGIN_STORE:
			const { userInfo } = action;
			return Object.assign({},state,{currentUser:userInfo});
		case actions.CLEAR_TOKEN:
			return initState;
		case actions.GET_ALL_USERS_SUCCESS:
			const { allUsers } = action;
			return Object.assign({},state,{allUsers});
		default:
			return state;
	}
};

export default reducer;