import {all} from "redux-saga/effects";
import userSagas from "./user/saga";
import todoSagas from "./todo/saga";
import projectSagas from "./project/saga";
import websocketSaga from "./websocket/saga";

export default function* rootSaga(){
	yield all([
		userSagas(),
		todoSagas(),
		projectSagas(),
		websocketSaga()
	]);
}

