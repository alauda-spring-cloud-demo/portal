import actions from "./actions";

const initState = {}

const reducer = (state = {},action)=>{
	switch(action.type){
		case actions.LOGIN_SUCCESS:
		case actions.LOGIN_STORE:
			const { userInfo } = action;
			return Object.assign({},state,{...userInfo});
		case actions.CLEAR_TOKEN:
			return initState;
		default:
			return state;
	}
};

export default reducer;