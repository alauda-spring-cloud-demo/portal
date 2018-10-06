import React,{ Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router"
import { Button } from "antd";
import Content from "../../components/Content";

class Portal extends Component{
	render(){
		return(
			<Content>
				<h1>Spring Cloud Demo</h1>
				<p>Spring Cloud前端示例站点</p>
				<Button onClick={this.props.dashboard} type="primary">开始</Button>
			</Content>
		);
	}
}

const mapStateToProps = (state)=>({});

const mapDispatchToProps = (dispatch)=>({
	dashboard:()=>dispatch(push("/projects"))
})

export default connect(mapStateToProps,mapDispatchToProps)(Portal);