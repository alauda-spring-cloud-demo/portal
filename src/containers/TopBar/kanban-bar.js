import React,{ Component } from "react";
import { connect } from "react-redux";
import { Form,Divider,Icon,Dropdown,Menu,Popover,Button } from "antd";
import wrapper from "./topbar.style";
import todoActions from "../../redux/todo/actions";

const { KanbanBarWrapper } = wrapper;

class KanbanBar extends Component{

	constructor(){
		super();
		this.appendUserToProject = this.appendUserToProject.bind(this);
		this.setManager = this.setManager.bind(this);
	}

	appendUserToProject(userId){
		const { project,appendUser } = this.props;
		appendUser({userId,projectId:project.id});
	}

	setManager(userId,userName){
		const { project,setManager } = this.props;
		setManager({userId,userName,projectId:project.id});
	}

	render(){
		const {project,users,usersSelectable,removeUserFromProject,hasAdvRole,isPM} = this.props;
		const selectUserMenu = (<Menu>
			{
				usersSelectable.map(u=>
					<Menu.Item key={u.id} onClick={()=>this.appendUserToProject(u.id)}>
						{`${u.displayName || u.username}(@${u.username})`}
					</Menu.Item>)
			}
		  </Menu>);

		const allUsers = users.concat(usersSelectable);

		const selectManagerMenu = hasAdvRole?(<Menu>
			{
				allUsers.map(u=>
					<Menu.Item key={u.id} onClick={()=>this.setManager(u.id,u.username)}>
						{`${u.displayName || u.username}(@${u.username})`}
					</Menu.Item>)
			}
		  </Menu>):<div />;

		return (
			<KanbanBarWrapper>
				{project.name}
				<Divider type="vertical" />
				{
					<Dropdown overlay={selectManagerMenu}>
					{
						project.ownerId?
						<div 
							key={project.ownerId} 
							title={project.ownerName} 
							className="manager">{project.ownerName[0].toLocaleUpperCase()}
						</div>:
						<div className="add-manager" title="选择项目经理">
							<Icon type="plus" />
						</div>
					}
					</Dropdown>
				}
				{
					users.map(user=>(
						<Popover 
							key={user.id}
							trigger="click" 
							content={hasAdvRole || isPM?<Button 
								block 
								onClick={()=>
									removeUserFromProject({projectId:project.id,userId:user.id})
								} 
								type="primary ">从项目移除</Button>:[]}
							title={`${user.displayName || user.username}(@${user.username})`}>
							<div key={user.id} title={user.displayName || user.username} className="user">{(user.displayName || user.username)[0].toLocaleUpperCase()}</div>
						</Popover>
					))
				}
				{
					usersSelectable.length > 0 && (hasAdvRole || isPM)?(
						<div className="add-user" title="添加项目成员">
							<Dropdown overlay={selectUserMenu}>
								<Icon type="user-add" />
							</Dropdown>
						</div>):[]
				}
			</KanbanBarWrapper>
		);
	}
}

const mapStateToProps = (state)=>({
	project:state.todo.project,
	users:state.todo.users,
	usersSelectable:state.todo.usersSelectable,
	hasAdvRole:state.user.authorities.find(role=>role =="ROLE_ADMIN" || role == "ROLE_PMO"),
	isPM:state.user.id == state.todo.project.ownerId
})

const mapDispatchToProps = (dispatch)=>({
	appendUser:({userId,projectId})=>dispatch(todoActions.appendUser({userId,projectId})),
	removeUserFromProject:({userId,projectId})=>dispatch(todoActions.removeUserFromProject({userId,projectId})),
	setManager:({userId,userName,projectId})=>dispatch(todoActions.setManager({userId,userName,projectId}))
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(KanbanBar));