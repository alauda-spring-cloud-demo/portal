import projectActions from "./actions";
import { all,fork,takeEvery,put,takeLatest } from "redux-saga/effects";
import { projectApi } from "../../api";

export function* listProject(){
	yield takeLatest(projectActions.list.pend,function*(){
		const res = yield projectApi.list();
		yield put(projectActions.list.success({projects:res.data}));
	})
}

export function* createProject(){
	yield takeLatest(projectActions.create.pend,function*({payload}){
		const { projectName } = payload;
		const res = yield projectApi.create({projectName});
		yield put(projectActions.list.pend());
	})
}

export default function* rootSaga(){
	yield all([
		fork(listProject),
		fork(createProject)
	])
}