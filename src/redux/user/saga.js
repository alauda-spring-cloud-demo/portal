import { takeEvery,all,fork,put } from 'redux-saga/effects';
import { push } from 'connected-react-router'
import userActions from './actions';
import { getToken,clearToken } from "../../helpers/utility";
import { userApi } from "../../api";

export function* logout() {
  yield takeEvery(userActions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}

export function* login() {
  yield takeEvery(userActions.LOGIN, function*({loginName,password}) {
    const res = yield userApi.login(loginName,password);
    if (res && res.data) {
        yield put(userActions.loginSuccess({
          token:res.data.access_token
        }));
    }
  });
}

export function* loginStore() {
  yield takeEvery(userActions.LOGIN_STORE, function*(user) {
    yield localStorage.setItem("token",user.token);
  });
}

export function* loginSuccess() {
  yield takeEvery(userActions.LOGIN_SUCCESS, function*(user) {
    yield put(userActions.loginStore(user));
    yield put(push('/dashboard'));
  });
}

export function* checkAuthorization() {
  yield takeEvery(userActions.CHECK_AUTHORIZATION, function*() {
  	const token = getToken();
    if (token) {
      yield put(userActions.loginStore({token}));
    }
  });
}

export default function* rootSaga(){
	yield all([
    fork(loginStore),
		fork(loginSuccess),
		fork(checkAuthorization),
		fork(logout),
    fork(login)
	]);
}