import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import todoReducer from './todo/reducer';
import projectReducer from './project/reducer';
import websocketReducer from './websocket/reducer';

const reducers = combineReducers({
	user:userReducer,
	todo:todoReducer,
	project:projectReducer,
	websocket:websocketReducer
})

export default reducers;