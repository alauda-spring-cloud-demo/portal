import actions from "./actions";

const initState = {
	project:{},users:[],usersSelectable:[],
	loading:true
};

const reducer = (state = initState,action)=>{
	switch(action.type){
		case actions.SET_MANAGER_SUCCESS:
			{
				const {project} = action;
				return Object.assign({},state,{project});
			}
		case actions.APPEND_USER_SUCCESS:
			{
				const {users,usersSelectable} = action;
				return Object.assign({},state,{users,usersSelectable});
			}
		case actions.LOAD_CARDS:
			{
				return Object.assign({},state,{loading:true});
			}
		case actions.LOAD_CARDS_SUCCESS:
			{
				const {cards,project,users,usersSelectable} = action;
				return Object.assign({},state,{cards,project,loading:false,users,usersSelectable});
			}
		case actions.APPEND_TODO:
			{
				const {cardIndex} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>i==cardIndex?Object.assign({},o,{appending:true}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.CANCEL_APPEND_TODO:
		case actions.FINISH_APPEND_TODO:
			{
				const {cardIndex} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>i==cardIndex?Object.assign({},o,{appending:false,todo_submiting:false}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.APPEND_CARD:
			{
				const {cards} = state;
				const cardList = cards.map(o=>o).concat({title:"",creating:true});
				return Object.assign({},state,{cards:cardList});
			}
		case actions.CANCEL_APPEND_CARD:
		case actions.FINISH_APPEND_CARD:
			{
				const {cardIndex} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>i==cardIndex?Object.assign({},o,{creating:false,card_submiting:false}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.START_CREATE_TODO:
			{
				const {cardIndex} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>i==cardIndex?Object.assign({},o,{todo_submiting:true}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.START_CREATE_CARD:
			{
				const {cardIndex} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>i==cardIndex?Object.assign({},o,{card_submiting:true}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.START_UPDATE_CARD:
			{
				const {cardId} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>o.id==cardId?Object.assign({},o,{updating:true}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.START_UPDATE_TODO:
			{
				const {cardId,todoId} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>{
					if(o.id == cardId){
						const todoList = o.todoList.map(t=>t.id==todoId?Object.assign({},t,{updating:true}):{...t})
						o.todoList = todoList;
						return Object.assign({},o,{todoList});
					}
					return {...o};
				})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.FINISH_UPDATE_CARD:
			{
				const {cardId} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>o.id==cardId?Object.assign({},o,{updating:false}):{...o})
				return Object.assign({},state,{cards:cardList});
			}
		case actions.FINISH_UPDATE_TODO:
			{
				const {cardId,todoId} = action;
				const {cards} = state;
				const cardList = cards.map((o,i)=>{
					if(o.id == cardId){
						const todoList = o.todoList.map(t=>t.id==todoId?Object.assign({},t,{updating:false}):{...t})
						o.todoList = todoList;
						return Object.assign({},o,{todoList});
					}
					return {...o};
				})
				return Object.assign({},state,{cards:cardList});
			}
		default:
			return state;
	}
};

export default reducer;