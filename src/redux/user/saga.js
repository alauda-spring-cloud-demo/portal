import { takeEvery,all,fork,put,call,takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import userActions from './actions';
import websocketActions from '../websocket/actions';
import { getToken,clearToken,getCurrentUser,setToken,setCurrentUser } from "../../helpers/utility";
import api,{ userApi } from "../../api";
import jwtDecode from "jwt-decode";
import { notification } from 'antd';

export function* logout() {
  yield takeEvery(userActions.LOGOUT, function*() {
    yield put(websocketActions.disconnect());
    clearToken();
    yield put(userActions.clearToken());
    yield put(push('/'));
  });
}

export function* login() {
  yield takeEvery(userActions.LOGIN, function*({loginName,password}) {
    const {access_token} = yield userApi.login(loginName,password);
    if (access_token) {
        yield call(setToken,access_token);
        let userInfo = jwtDecode(access_token);
        yield call(setCurrentUser,userInfo);
        yield put(userActions.loginSuccess({
          token:access_token,...userInfo
        }));
        yield put(websocketActions.connect());
        yield put(push('/projects'));
    }
  });
}

export function* createUser() {
  yield takeLatest(userActions.CREATE_USER, function*({username,password,displayName,mail}) {
    yield call(userApi.createUser,{username,password,displayName,mail});
    notification["info"]({message:"注册成功"})
    yield put(push("/login"));
  });
}

export function* checkAuthorization() {
  yield takeEvery(userActions.CHECK_AUTHORIZATION, function*() {
  	const token = getToken();
    const userInfo = getCurrentUser();
    api.init();
    if (token!=undefined && token!="undefined") {
      yield put(userActions.loginStore({token,...userInfo}));
      yield put(websocketActions.connect());
    }
  });
}

export default function* rootSaga(){
	yield all([
		fork(checkAuthorization),
		fork(logout),
    fork(login),
    fork(createUser)
	]);
}