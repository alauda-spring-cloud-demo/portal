import React,{ Component } from "react";
import { connect } from "react-redux";
import userActions from "../../redux/user/actions";
import Content from "../../components/Content";

const { logout } = userActions;

class Dashboard extends Component{
	render(){
		return (
			<Content>
				<h1>Dashboard Page</h1>
			</Content>
		);
	}
}

const mapStateToProps = (state)=>({})

const mapDispatchToProps = (dispatch)=>({
	logout:()=>dispatch(logout())
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);