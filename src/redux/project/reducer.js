import { handleActions } from "redux-actions";
import projectActions from "./actions";

const initState = {
	projects:[]
};
let actions = {};

actions[projectActions.list.success] = (state,action)=>{
	const {projects} = action.payload;
	return Object.assign({},state,{projects});
}

const reducer = handleActions(actions,initState);

export default reducer;

