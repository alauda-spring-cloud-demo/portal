import React,{ Component } from "react";
import { connect } from "react-redux";
import Content from "../../components/Content";

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
	
})

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);