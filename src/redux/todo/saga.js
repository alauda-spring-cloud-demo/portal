import { takeEvery,all,fork,put,select,takeLatest,call,take,cancel,cancelled } from 'redux-saga/effects';
import { delay,eventChannel } from "redux-saga";
import todoActions from "./actions";
import { todoApi,projectApi,userApi } from "../../api";
import UrlSearchParams from "url-search-params";
import { getCurrentUser,getToken } from "../../helpers/utility";

export function* loadCards() {
  yield takeLatest(todoActions.LOAD_CARDS, function*() {
    const searchParams = yield select(state=>state.router.location.search);
    const projectId = new UrlSearchParams(searchParams).get("project");
    const res = yield projectApi.get(projectId);
  	const cards = yield todoApi.getCards({project:projectId});
    const users = yield userApi.getUsersInProject(projectId);
    const allUsers = yield userApi.getAllUsers();

    const userIds = users.map(o=>o.id);

    const usersSelectable = allUsers.filter(o=>userIds.indexOf(o.id)<0);

    yield put(todoActions.loadCardsSuccess({
      cards:cards.data,
      project:res.data,
      users,
      usersSelectable
    }));
  });
}

export function* setManager(){
  yield takeLatest(todoActions.SET_MANAGER, function* ({projectId,userId,userName}){
    yield projectApi.setManager({projectId,userId,userName});
    const project = yield select(state=>state.todo.project);
    yield put(todoActions.setManagerSuccess({
      project:Object.assign({},project,{
        ownerId:userId,
        ownerName:userName
      })
    }));
  });
}

export function* assignTodo(){
  yield takeLatest(todoActions.ASSIGN_TODO, function* ({todoId,userId}){
    yield todoApi.updateTodo({
      id:todoId,
      uid:userId
    });
    // yield put(todoActions.loadCards());
  });
}

export function* appendUserToProject(){
  yield takeLatest(todoActions.APPEND_USER, function* ({projectId,userId}){
    yield userApi.addUserToProject({projectId,userId})
    const users = yield userApi.getUsersInProject(projectId);
    const allUsers = yield userApi.getAllUsers();
    const userIds = users.map(o=>o.id);
    const usersSelectable = allUsers.filter(o=>userIds.indexOf(o.id)<0);
    yield put(todoActions.appendUserSuccess({users,usersSelectable}));
  });
}

export function* removeUserFromProject(){
  yield takeLatest(todoActions.REMOVE_USER_FROM_PROJECT, function* ({projectId,userId}){
    yield userApi.removeUserFromProject({projectId,userId});
    const users = yield userApi.getUsersInProject(projectId);
    const allUsers = yield userApi.getAllUsers();
    const userIds = users.map(o=>o.id);
    const usersSelectable = allUsers.filter(o=>userIds.indexOf(o.id)<0);
    yield put(todoActions.appendUserSuccess({users,usersSelectable}));
  });
}

export function* createTodo() {
  yield takeLatest(todoActions.CREATE_TODO, function*({title,cardIndex,cardId}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards[cardIndex].todo_submiting) return;
  	yield put(todoActions.startCreateTodo(cardIndex));
  	const todo = yield todoApi.createTodo({title,cardId});
  	yield put(todoActions.finishAppendTodo());
    // yield put(todoActions.loadCards());
  });
}

export function* deleteTodo() {
  yield takeLatest(todoActions.DELETE_TODO, function*({cardId,todoId}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards.find(o=>o.id==cardId).todoList.find(o=>o.id==todoId).updating) return;
  	yield put(todoActions.startUpdateTodo({cardId,todoId}));
  	const todo = yield todoApi.deleteTodo(todoId);
    // yield put(todoActions.loadCards());
  });
}

export function* deleteCard() {
  yield takeLatest(todoActions.DELETE_CARD, function*({id}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards.find(o=>o.id==id).updating) return;
  	yield put(todoActions.startUpdateCard(id));
  	const todo = yield todoApi.deleteCard(id);
    // yield put(todoActions.loadCards());
  });
}

export function* createCard() {
  yield takeLatest(todoActions.CREATE_CARD, function*({title,cardIndex}) {
  	const { cards,projectId } = yield select(state=>({
      cards:state.todo.cards,
      projectId:state.todo.project.id
    }));
  	if(cards[cardIndex].card_submiting) return;
  	yield put(todoActions.startCreateCard(cardIndex));
  	const todo = yield todoApi.createCard({title,projectId});
  	yield put(todoActions.finishAppendCard());
    // yield put(todoActions.loadCards());
  });
}

export function* updateTodo() {
  yield takeLatest(todoActions.UPDATE_TODO, function*({todo}) {
  	const cards = yield select(state=>state.todo.cards);
  	let fromCardId;
  	const isUpdating = cards.reduce((prev,cur,indx,arr)=>{
					  		let res = cur.todoList.find(o=>o.id==todo.id);
					  		if(res){
					  			fromCardId = cur.id;
					  			return res.updating;
					  		}
					  		return false;
					  	},false);

  	if(isUpdating) return;
  	yield put(todoActions.startUpdateTodo({cardId:fromCardId,todoId:todo.id}));
  	yield todoApi.updateTodo(todo);
    // yield put(todoActions.loadCards());
  });
}

export default function* rootSaga(){
	yield all([
    	fork(loadCards),
    	fork(createTodo),
    	fork(deleteTodo),
    	fork(updateTodo),
    	fork(deleteCard),
    	fork(createCard),
      fork(appendUserToProject),
      fork(removeUserFromProject),
      fork(setManager),
      fork(assignTodo)
	]);
}