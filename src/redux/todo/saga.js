import { takeEvery,all,fork,put,select,takeLatest } from 'redux-saga/effects';
import { delay } from "redux-saga";
import todoActions from "./actions";
import { todoApi } from "../../api";

export function* loadCards() {
  yield takeEvery(todoActions.LOAD_CARDS, function*() {
  	const cards = yield todoApi.getCards();
    yield put(todoActions.loadCardsSuccess(cards.data));
  });
}

export function* createTodo() {
  yield takeLatest(todoActions.CREATE_TODO, function*({title,cardIndex,cardId}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards[cardIndex].todo_submiting) return;
  	yield put(todoActions.startCreateTodo(cardIndex));
  	console.log(cardId)
  	const todo = yield todoApi.createTodo({title,cardId});
  	yield put(todoActions.finishAppendTodo());
    yield put(todoActions.loadCards());
  });
}

export function* deleteTodo() {
  yield takeEvery(todoActions.DELETE_TODO, function*({cardId,todoId}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards.find(o=>o.id==cardId).todoList.find(o=>o.id==todoId).updating) return;
  	yield put(todoActions.startUpdateTodo({cardId,todoId}));
  	const todo = yield todoApi.deleteTodo(todoId);
    yield put(todoActions.loadCards());
  });
}

export function* deleteCard() {
  yield takeEvery(todoActions.DELETE_CARD, function*({id}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards.find(o=>o.id==id).updating) return;
  	yield put(todoActions.startUpdateCard(id));
  	const todo = yield todoApi.deleteCard(id);
    yield put(todoActions.loadCards());
  });
}

export function* createCard() {
  yield takeLatest(todoActions.CREATE_CARD, function*({title,cardIndex}) {
  	const cards = yield select(state=>state.todo.cards);
  	if(cards[cardIndex].card_submiting) return;
  	yield put(todoActions.startCreateCard(cardIndex));
  	const todo = yield todoApi.createCard(title);
  	yield put(todoActions.finishAppendCard());
    yield put(todoActions.loadCards());
  });
}

export function* updateTodo() {
  yield takeEvery(todoActions.UPDATE_TODO, function*({todo}) {
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
    yield put(todoActions.loadCards());
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
	]);
}