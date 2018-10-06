import React,{ Component } from "react";
import { Layout,Dropdown,Menu,Button } from "antd";
import logo from "../../image/logo.png";
import avata from "../../image/avata.jpg";
import wrapper from "./topbar.style";
import { connect } from "react-redux";
import userActions from "../../redux/user/actions";
import { push } from "connected-react-router";
import KanbanBar from "./kanban-bar";

const { Header } = Layout;

const { TopBarWrapper } = wrapper;

class TopBar extends Component{
	render(){

		const {token,display_name,user_name} = this.props.user;
		const {push,logout} = this.props;
		const {location} = this.props;
		const menu = (
		  <Menu>
		    <Menu.Item onClick={()=>logout()}>退出登录</Menu.Item>
		  </Menu>
		);

		return (
			[<Header key="header">
				<TopBarWrapper>
					<div className="leftSide">
						<img alt="" className="logo" src={logo} onClick={()=>push('/')} />
					</div>
					<div className="rightSide">
						{
							token?<Dropdown overlay={menu} placement="bottomRight">
									<div className="user-info">
										<img alt="" className="avata" src={avata} />
										<div className="username">{display_name || user_name}</div>
									</div>
								</Dropdown>:[]
						}
					</div>
				</TopBarWrapper>
			</Header>,
					location.pathname == "/kanban"?<KanbanBar key="kanban-bar" />:[]
				]);
	}
}

const mapStateToProps = (state) => ({
	user:state.user,
	location:state.router.location
})

const mapDispatchToProps = (dispatch) => ({
	logout:()=>dispatch(userActions.logout()),
	push:(path)=>dispatch(push(path))
})

export default connect(mapStateToProps,mapDispatchToProps)(TopBar);