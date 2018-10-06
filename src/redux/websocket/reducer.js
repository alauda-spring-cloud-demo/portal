import { handleActions } from "redux-actions";
import websocketActions from "./actions";

const initState = {};

let actions = {};

actions[websocketActions.connect] = (state,action)=>{
	return state;
}

const reducer = handleActions(actions,initState);

export default reducer;