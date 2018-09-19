import axios from "axios";
import { getToken } from "../helpers/utility";

const getCards = async ()=>{
  return await axios("/todo-service/cards")
};

const createTodo = async ({title,cardId})=>{
  return await axios({
  	url:"/todo-service/todos",
  	method:"POST",
  	data:{
  		cardId,
  		title
  	}
  })
};

const deleteTodo = async (id)=>{
  return await axios({
  	url:`/todo-service/todos/${id}`,
  	method:"DELETE"
  })
};

const updateTodo = async (todo)=>{
  return await axios({
  	url:`/todo-service/todos/${todo.id}`,
  	method:"PUT",
  	data:todo
  })
};

const deleteCard = async (id)=>{
  return await axios({
  	url:`/todo-service/cards/${id}`,
  	method:"DELETE"
  })
};

const createCard = async (title)=>{
  return await axios({
  	url:"/todo-service/cards",
  	method:"POST",
  	data:{
  		title
  	}
  })
};

const todo = {
	getCards,
	createTodo,
	deleteTodo,
	updateTodo,
	deleteCard,
	createCard
}

export default todo;