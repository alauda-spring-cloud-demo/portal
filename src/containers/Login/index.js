import React,{Component} from "react";
import {connect} from "react-redux";
import userActions from "../../redux/user/actions";
import { Input,Button,Col,Icon,Form } from "antd";
import { LoginWrapper,RowWrapper,FormItemWrapper } from "./login.style";
import { push } from "connected-react-router"
import { Link } from "react-router-dom";

const { login } = userActions;

class Login extends Component{

	handleSubmit(e){
		e.preventDefault();
		const { getFieldsValue,validateFields } = this.props.form;
		const { login } = this.props;

	    validateFields((err, values) => {
	      if (!err) {
	      	const {loginName,password} = getFieldsValue(['loginName','password'])
	        login(loginName,password);
	      }
	    });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const colProps = {lg:{span:4,offset:10},md:{span:4,offset:10},sm:{span:8,offset:8},xs:24};
		return (
			<LoginWrapper>
				<Form>
					<RowWrapper>
						<Col {...colProps} >
							<h2>Spring Cloud Demo</h2>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<FormItemWrapper>
								{
									getFieldDecorator('loginName',{
										rules:[
											{ required: true, message: '请输入用户名' }
										]
									})(
										<Input onPressEnter={(e)=>this.handleSubmit(e)} prefix={<Icon type="user" />} placeholder="用户名" />
									)
								}
							</FormItemWrapper>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<FormItemWrapper>
								{
									getFieldDecorator('password',{
										rules:[
											{ required: true, message: '请输入密码' }
										]
									})(
										<Input onPressEnter={(e)=>this.handleSubmit(e)} prefix={<Icon type="lock" />} type="password" placeholder="密码" />
									)
								}
							</FormItemWrapper>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<Button type="primary" onClick={(e)=>this.handleSubmit(e)}>登录</Button>
							<Button onClick={()=>this.props.push("/registry")}>注册</Button>
						</Col>
					</RowWrapper>
				</Form>
			</LoginWrapper>
		);
	}
}

const mapStateToProps = (state)=>({})

const mapDispatchToProps = (dispatch)=>({
	login:(loginName,password)=>dispatch(login(loginName,password)),
	push:(obj)=>dispatch(push(obj))
})

export default Form.create()(connect(mapStateToProps,mapDispatchToProps)(Login));