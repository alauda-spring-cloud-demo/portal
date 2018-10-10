import React,{ Component } from "react";
import { connect } from "react-redux";
import { Form,Table,Select,notification } from "antd";
import userActions from "../../redux/user/actions";
import classNames from "classnames";
import {ManagementWrapper} from "./management.style";

const Option = Select.Option;

class Management extends Component{

	componentWillMount(){
		const {getAllUsers} = this.props;
		getAllUsers(0,10);
	}

	render(){
		const {users,total,size,page,getAllUsers,updateUser,currentUser} = this.props;

		const columns = [{
		  title: '用户ID',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '用户名',
		  dataIndex: 'username',
		  key: 'username',
		}, {
		  title: '姓名',
		  dataIndex: 'displayName',
		  key: 'displayName',
		},{
		  title: '邮箱',
		  dataIndex: 'mail',
		  key: 'mail',
		},{
		  title: '手机号',
		  dataIndex: 'phone',
		  key: 'phone',
		},{
			title:'角色',
			dataIndex: 'authorities',
			key:'authorities',
			render:(text,record,number)=>{
				let authorities = record.authorities.map(o=>o.authority);
				let options = ['ROLE_ADMIN','ROLE_PMO','ROLE_PM','ROLE_USER'];
				return (
					<Select 
						onChange={(value,opts)=>{
							let authValues = opts.map(opt=>({authority:opt.props.children}));
							if(authValues.length == 0){
								notification["warn"]({message:"用户至少要保留一个角色"});
							}else{
								updateUser({
									id:record.id,
									authorities:authValues
								})
							}
						}}
						disabled={record.id == currentUser.id}
						mode="tags" 
						style={{width:"100%"}} 
						value={authorities}
						tokenSeparators={[',']}
						>
						{options.filter(o=>authorities.indexOf(o)<0).map((o,i)=>
							<Option
								key={i}
							>{o}</Option>
						)}
					</Select>)
			}
		}];

		return (
			<ManagementWrapper>
				<Table pagination={{current:page,pageSize:size,total:total,onChange:(page,pageSize)=>getAllUsers(page - 1,pageSize)}} rowKey="id" dataSource={users} columns={columns} />
			</ManagementWrapper>
		);
	}
}

const mapStateToProps = (state)=>({
	users:state.user.allUsers.content,
	total:state.user.allUsers.totalElements,
	size:state.user.allUsers.size,
	page:state.user.allUsers.number + 1,
	currentUser:state.user.currentUser
})

const mapDispatchToProps = (dispatch)=>({
	getAllUsers:(page,size)=>dispatch(userActions.getAllUsers({page,size})),
	updateUser:(user)=>dispatch(userActions.updateUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Management));