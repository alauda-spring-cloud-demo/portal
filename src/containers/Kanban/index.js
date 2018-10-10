import React,{ Component } from "react";
import { connect } from "react-redux";
import ContentWrapper from "./kanban.style";
import { Row,Col,Card,Skeleton,Button,Icon,Input,Form,Menu,Dropdown,appendCard } from "antd";
import todoActions from "../../redux/todo/actions";
import classNames from "classnames";

const SubMenu = Menu.SubMenu;

class Kanban extends Component{

	componentWillMount(){
		this.props.loadCards();
	}

	handleAppendTodo(e,cardIndex){
		const {cards} = this.props;
		const {createTodo} = this.props;
		e.preventDefault();
		const { getFieldValue,validateFields } = this.props.form;
		validateFields((err, values) => {
			if (!err) {
				const title = getFieldValue(`title_${cardIndex}`);
				if(!title){
					this.props.cancelAppendTodo(cardIndex);
				}else{
					const cardId = cards[cardIndex].id;
					createTodo({title,cardIndex,cardId})
				}
			}
		});
	}

	handleAppendCard(e,cardIndex){
		const {cards} = this.props;
		const {createTodo,createCard} = this.props;
		e.preventDefault();
		const { getFieldValue,validateFields } = this.props.form;
		validateFields((err, values) => {
			if (!err) {
				const cardTitle = getFieldValue(`card_title_${cardIndex}`);
				if(!cardTitle){
					this.props.cancelAppendCard(cardIndex);
				}else{
					createCard(cardTitle,cardIndex)
				}
			}
		});
	}

	render(){
		let { cards,loading,users,hasAdvRole,isPM } = this.props;
		let { getFieldDecorator } = this.props.form;
		let { assignTodo,appendTodo,cancelAppendTodo,deleteTodo,updateTodo,deleteCard,appendCard,cancelAppendCard } = this.props;

		const getUserName = (todo)=>{
			let user = users.find(u=>u.id == todo.uid);
			if(user){
				return (user.displayName || user.username)[0].toLocaleUpperCase(); 
			}
		}

		const menu = (cardId,todo)=>(
		  <Menu>
		  	<SubMenu title="移动到">
		      	{
		      		cards?cards.filter(o=>o.id!=cardId).map((o,i)=><Menu.Item onClick={()=>{
		      			todo.cardId = o.id;
		      			updateTodo(todo);
		      		}} key={i}>{o.title}</Menu.Item>):[]
		      	}
		      </SubMenu>
		    {
		    	hasAdvRole || isPM?<SubMenu title="分配给">
		    	{
		    		users.map(u=><Menu.Item key={u.id} onClick={()=>assignTodo({todoId:todo.id,userId:u.id})}>{u.displayName || u.username}</Menu.Item>)
		    	}
		    </SubMenu>:[]
		    }
		    <Menu.Item onClick={()=>deleteTodo({cardId:cardId,todoId:todo.id})}>删除</Menu.Item>
		  </Menu>
		);

		const cardMenu = (cardId)=>(
		  <Menu>
		    <Menu.Item onClick={()=>deleteCard(cardId)}>删除</Menu.Item>
		  </Menu>
		);

		let rows = [];

		if(cards){
			rows = cards.reduce((prev,cur,idx)=>{
				if(idx % 4 == 0){
					prev.push([])
				}
				prev[prev.length - 1].push(cur);
				return prev;
			},[]);
		}
		return (
			<ContentWrapper>
				{
					rows.length==0?
						<Row gutter={10}>
							{
								Array(4).fill(0).map((v,i)=>
									<Col span={6} key={i}>
										<Card title={<Skeleton loading={loading} active paragraph={false}></Skeleton>}>
											<Skeleton loading={loading} active paragraph={{rows:5}} title={false}></Skeleton>
										</Card>
									</Col>)
							}
						</Row>
						:
						rows.map((cols,idx)=>
							<Row gutter={10} key={idx}>
								{
									cols.map((card,i)=>
										<Col span={6} key={i}>
											<Card 
												className={classNames({ card:true,updating:card.updating})}
												extra={card.updating || !hasAdvRole?[]:(card.creating?[]:<Dropdown overlay={cardMenu(card.id)}><Icon type="bars" /></Dropdown>)}
												title={card.creating?getFieldDecorator(`card_title_${idx*4 + i}`)(
													<Input disabled={card.card_submiting} onPressEnter={(e)=>this.handleAppendCard(e,idx*4 + i)} />
													):card.title}
												actions={
													card.updating?[]:
													(card.appending?[
														<Icon type="check" onClick={(e)=>this.handleAppendTodo(e,idx*4 + i)} />,
														<Icon type="close" onClick={()=>cancelAppendTodo(idx*4 + i)} />
													]
													:(card.creating?[
															<Icon type="check" onClick={(e)=>this.handleAppendCard(e,idx*4 + i)} />,
															<Icon type="close" onClick={()=>cancelAppendCard(idx*4 + i)} />
														]
														:[<Icon onClick={()=>appendTodo(idx*4 + i)} type="plus" />]))}
											>
											{
												card.todoList?card.todoList.map((todo,i)=>(
													<div className={classNames({ todo:true,updating:todo.updating})} key={i}>
														<div className="todo-title">{todo.title}</div>
														<div className="todo-opts">
														{
															todo.uid?<div className="todo-user">{getUserName(todo)}</div>:[]
														}
														{
															todo.updating?[]:(
																<Dropdown overlay={menu(card.id,todo)}>
																	<Icon type="bars" />
																</Dropdown>
															)
														}
														</div>
													</div>
												)):[]
											}
											{
												card.appending?(
													<div className="todo">
														{
															getFieldDecorator(`title_${idx*4 + i}`)(
																<Input disabled={card.todo_submiting} onPressEnter={(e)=>this.handleAppendTodo(e,idx*4 + i)} />
															)
														}
													</div>
												):[]
											}
											</Card>
										</Col>
									)
								}
								{
									cols.length % 4!=0  && hasAdvRole ?(
										<Col span={6}>
											<Button onClick={appendCard} icon="plus" block>添加卡片</Button>
										</Col>)
										:[]
								}
							</Row>)
				}
				{
					cards && cards.length %4 == 0 && hasAdvRole?
						<Row gutter={10}>
							<Col span={6}>
								<Button onClick={appendCard} icon="plus" block>添加卡片</Button>
							</Col>
						</Row>:[]
				}
			</ContentWrapper>
		);
	}
}

const mapStateToProps = (state)=>({
	cards:state.todo.cards,
	loading:state.todo.loading,
	users:state.todo.users,
	hasAdvRole:state.user.currentUser.authorities.find(role=>role =="ROLE_ADMIN" || role == "ROLE_PMO"),
	isPM:state.user.currentUser.id == state.todo.project.ownerId
})

const mapDispatchToProps = (dispatch)=>({
	loadCards:()=>dispatch(todoActions.loadCards()),
	appendTodo:(cardIndex)=>dispatch(todoActions.appendTodo(cardIndex)),
	cancelAppendTodo:(cardIndex)=>dispatch(todoActions.cancelAppendTodo(cardIndex)),
	createTodo:({title,cardIndex,cardId})=>dispatch(todoActions.createTodo({title,cardIndex,cardId})),
	deleteTodo:({cardId,todoId})=>dispatch(todoActions.deleteTodo({cardId,todoId})),
	updateTodo:(todo)=>dispatch(todoActions.updateTodo(todo)),
	deleteCard:(id)=>dispatch(todoActions.deleteCard(id)),
	appendCard:()=>dispatch(todoActions.appendCard()),
	cancelAppendCard:(cardIndex)=>dispatch(todoActions.cancelAppendCard(cardIndex)),
	createCard:(title,cardIndex)=>dispatch(todoActions.createCard(title,cardIndex)),
	assignTodo:({todoId,userId})=>dispatch(todoActions.assignTodo({todoId,userId}))
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Kanban));