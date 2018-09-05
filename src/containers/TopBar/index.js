import React,{ Component } from "react";
import { Layout,Dropdown,Menu } from "antd";
import logo from "../../image/logo.png";
import avata from "../../image/avata.jpg";
import TopBarWrapper from "./topbar.style";
import { connect } from "react-redux";
import userActions from "../../redux/user/actions";
import { push } from "connected-react-router";

const { Header } = Layout;

class TopBar extends Component{
	render(){

		const {token} = this.props.user;
		const {push} = this.props;

		const menu = (
		  <Menu>
		    <Menu.Item onClick={this.props.logout}>退出登录</Menu.Item>
		  </Menu>
		);

		return (
			<Header>
				<TopBarWrapper>
					<div className="leftSide">
						<img alt="" className="logo" src={logo} onClick={()=>push('/')} />
					</div>
					<div className="rightSide">
						{
							token?(
								<Dropdown overlay={menu} placement="bottomRight">
									<img alt="" className="avata" src={avata} />
								</Dropdown>
							):[]
						}
					</div>
				</TopBarWrapper>
			</Header>);
	}
}

const mapStateToProps = (state) => ({
	user:state.user
})

const mapDispatchToProps = (dispatch) => ({
	logout:()=>dispatch(userActions.logout()),
	push:(path)=>dispatch(push(path))
})

export default connect(mapStateToProps,mapDispatchToProps)(TopBar);