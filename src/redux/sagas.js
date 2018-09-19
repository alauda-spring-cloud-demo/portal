import {all} from "redux-saga/effects";
import userSagas from "./user/saga";
import todoSagas from "./todo/saga";

export default function* rootSaga(){
	yield all([
		userSagas(),
		todoSagas()
	]);
}

