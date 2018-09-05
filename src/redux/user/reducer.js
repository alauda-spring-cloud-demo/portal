import actions from "./actions";

const initState = {}

const reducer = (state = {},action)=>{
	switch(action.type){
		case actions.LOGIN_SUCCESS:
		case actions.LOGIN_STORE:
			const {token,userName,avata} = action;
			return Object.assign({},state,{token,userName,avata});
		case actions.LOGOUT:
			return initState;
		default:
			return state;
	}
};

export default reducer;