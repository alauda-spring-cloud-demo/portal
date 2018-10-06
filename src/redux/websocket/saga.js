import { takeEvery,all,fork,put,select,takeLatest,call,take,cancel,cancelled } from 'redux-saga/effects';
import websocketActions from "./actions";
import { getCurrentUser,getToken } from "../../helpers/utility";
import { delay,eventChannel } from "redux-saga";
import StompJS from "stompjs";
import { notification } from 'antd';
import UrlSearchParams from "url-search-params";
import { push } from "connected-react-router";
import todoActions from "../todo/actions";

function* connect(){
	yield takeLatest(websocketActions.connect,function* (){
		const token = yield call(getToken);
		if(token){

			try{
				let sockUrl = `ws://127.0.0.1:9999/message-service/stomp/websocket?token=${token}`;
				let client = yield call(StompJS.client,sockUrl);
				
				let sockChannel = eventChannel(emit=>{
					client.connect({},frame=>{
						console.log("ws已连接");
						emit({
							state:"success",
							client
						})
					},error=>{
						emit({
							state:"error",
							client
						})
					});

					return ()=>client.disconnect(()=>console.log("ws已关闭连接"));
				});

				yield fork(connectSuccess,sockChannel);
				yield fork(connectError,sockChannel);
				yield fork(disconnect,client);
			}catch(err){
				console.log(err);
			}
		}
	});
}

function* disconnect(client){
	yield takeLatest(websocketActions.disconnect,function* (){
		yield client.disconnect();
	});
}

function* connectSuccess(sockChannel){
	yield takeEvery(sockChannel,function* (payload){
		const { state,client } = payload;
		if(state == "success"){
			yield fork(createMessageChannel,sockChannel,client);
			yield fork(createLogsChannel,sockChannel,client);

			let location = yield select(state=>state.router.location);

			if(location.pathname == "/kanban"){
				yield put({
					type:"CREATE_LOGS_CHANNEL",
					payload:{location}
				});
			}
		}
	});
}

function* connectError(sockChannel,client){
	yield takeEvery(sockChannel,function* (payload){
		const { state,client } = payload;
		if(state == "error"){
			console.log("断开连接，2秒后重试");
			yield delay(2000);
			yield put(websocketActions.connect());
		}
	});
}

function* createMessageChannel(sockChannel,client){
	let messageChannel = eventChannel(emit => {
		console.log("开始监听用户消息");
		let subscription = client.subscribe(`/user/queue/messages`,res=>{
		  emit({message:res.body});
		});
		return () => subscription.unsubscribe();
	});

	yield fork(receiveMessage,{messageChannel,sockChannel});

	const { state } = yield take(sockChannel);
	if(state == "error"){
		messageChannel.close();
	}
}

function* receiveMessage({messageChannel,sockChannel}){
	yield takeEvery(messageChannel,function* ({message}){
		notification["info"]({message,duration:null});
	});
}

function* createLogsChannel(sockChannel,client){
	let logChannel = undefined;
	yield takeEvery(["@@router/LOCATION_CHANGE","CREATE_LOGS_CHANNEL"],function*({payload}){
		if(payload.location.pathname == "/kanban"){
			const searchParams = yield select(state=>state.router.location.search);
			const projectId = new UrlSearchParams(searchParams).get("project");
			const subscribeId = `project_${projectId}_subscribe`;

			logChannel = eventChannel(emit => {
				console.log("开始监听项目日志");
				let subscription = client.subscribe(`/topic/project/${projectId}/logs`,res=>{
				  	emit({message:res.body});
				},{id:subscribeId});
				return () => {
				  subscription.unsubscribe();
				}
			});
		  	yield fork(receiveLogs,logChannel);

		  	const { state } = yield take(sockChannel);
			if(state == "error"){
				console.log("停止监听项目日志");
				logChannel.close();
			}
		}else if(logChannel){
			console.log("停止监听项目日志");
			logChannel.close();
		}
	});
}

function* receiveLogs(logChannel){
	yield takeEvery(logChannel,function* ({message}){
		notification["info"]({message,duration:2});
		yield put(todoActions.loadCards());
	});
}

export default function* rootSaga(){
	yield all([
		fork(connect)
	]);
}