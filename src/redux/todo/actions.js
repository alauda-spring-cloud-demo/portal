const LOAD_CARDS_SUCCESS = "todo/LOAD_CARDS_SUCCESS";
const LOAD_CARDS = "todo/LOAD_CARDS";
const APPEND_TODO = "todo/APPEND_TODO";
const START_CREATE_TODO = "todo/START_CREATE_TODO";
const CANCEL_APPEND_TODO = "todo/CANCEL_APPEND_TODO";
const FINISH_APPEND_TODO = "todo/FINISH_APPEND_TODO";
const CREATE_TODO = "todo/CREATE_TODO";
const DELETE_TODO = "todo/DELETE_TODO";
const UPDATE_TODO = "todo/UPDATE_TODO";
const DELETE_CARD = "todo/DELETE_CARD";
const APPEND_CARD = "todo/APPEND_CARD";
const START_CREATE_CARD = "todo/START_CREATE_CARD";
const CANCEL_APPEND_CARD = "todo/CANCEL_APPEND_CARD";
const CREATE_CARD = "todo/CREATE_CARD";
const FINISH_APPEND_CARD = "todo/FINISH_APPEND_CARDs";
const START_UPDATE_CARD = "todo/START_UPDATE_CARD";
const FINISH_UPDATE_CARD = "todo/FINISH_UPDATE_CARD";
const START_UPDATE_TODO = "todo/START_UPDATE_TODO";
const FINISH_UPDATE_TODO = "todo/FINISH_UPDATE_TODO";

const loadCardsSuccess = (cards)=>({
	type:LOAD_CARDS_SUCCESS,
	cards
})

const loadCards = ()=>({
	type:LOAD_CARDS
})

const appendTodo = (cardIndex)=>({
	type:APPEND_TODO,
	cardIndex
})

const cancelAppendTodo = (cardIndex)=>({
	type:CANCEL_APPEND_TODO,
	cardIndex
})

const finishAppendTodo = (cardIndex)=>({
	type:FINISH_APPEND_TODO,
	cardIndex
})

const startCreateTodo = (cardIndex)=>({
	type:START_CREATE_TODO,
	cardIndex
})

const createTodo = ({title,cardIndex,cardId})=>({
	type:CREATE_TODO,
	title,cardIndex,cardId
})

const deleteTodo = ({cardId,todoId})=>({
	type:DELETE_TODO,
	cardId,todoId
})

const updateTodo = (todo)=>({
	type:UPDATE_TODO,
	todo
})

const deleteCard = (id)=>({
	type:DELETE_CARD,
	id
})

const appendCard = ()=>({
	type:APPEND_CARD
})

const cancelAppendCard = (cardIndex)=>({
	type:CANCEL_APPEND_CARD,
	cardIndex
})

const finishAppendCard = (cardIndex)=>({
	type:FINISH_APPEND_CARD,
	cardIndex
})

const startCreateCard = (cardIndex)=>({
	type:START_CREATE_CARD,
	cardIndex
})

const createCard = (title,cardIndex)=>({
	type:CREATE_CARD,
	title,cardIndex
})

const startUpdateCard = (cardId)=>({
	type:START_UPDATE_CARD,
	cardId
})

const startUpdateTodo = ({cardId,todoId})=>({
	type:START_UPDATE_TODO,
	cardId,todoId
})

const finishUpdateCard = (cardId)=>({
	type:FINISH_UPDATE_CARD,
	cardId
})

const finishUpdateTodo = ({cardId,todoId})=>({
	type:FINISH_UPDATE_TODO,
	todoId
})

const actions = {

	LOAD_CARDS,
	loadCards,

	LOAD_CARDS_SUCCESS,
	loadCardsSuccess,

	APPEND_TODO,
	appendTodo,

	CANCEL_APPEND_TODO,
	cancelAppendTodo,

	CREATE_TODO,
	createTodo,

	FINISH_APPEND_TODO,
	finishAppendTodo,

	DELETE_TODO,
	deleteTodo,

	UPDATE_TODO,
	updateTodo,

	DELETE_CARD,
	deleteCard,

	APPEND_CARD,
	appendCard,

	CANCEL_APPEND_CARD,
	cancelAppendCard,

	CREATE_CARD,
	createCard,

	FINISH_APPEND_CARD,
	finishAppendCard,

	START_CREATE_CARD,
	startCreateCard,

	START_CREATE_TODO,
	startCreateTodo,

	START_UPDATE_CARD,
	startUpdateCard,

	START_UPDATE_TODO,
	startUpdateTodo,

	FINISH_UPDATE_CARD,
	finishUpdateCard,

	FINISH_UPDATE_TODO,
	finishUpdateTodo,
}

export default actions;