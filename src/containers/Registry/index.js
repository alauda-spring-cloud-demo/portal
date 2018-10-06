import React,{Component} from "react";
import {connect} from "react-redux";
import userActions from "../../redux/user/actions";
import { Input,Button,Col,Icon,Form } from "antd";
import { LoginWrapper,RowWrapper,FormItemWrapper } from "../Login/login.style";

class Registry extends Component{

	constructor(){
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateToNextPassword = this.validateToNextPassword.bind(this);
		this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
		this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
		this.state = {
			confirmDirty:false
		}
	}

	handleConfirmBlur(e){
	    const value = e.target.value;
	    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
	}

	handleSubmit(e){
		e.preventDefault();
		const { getFieldsValue,validateFields } = this.props.form;
		const { createUser } = this.props;

	    validateFields((err, values) => {
	      if (!err) {
	      	const {username,password,displayName,mail} = getFieldsValue(['username','password','displayName','mail'])
	        createUser({username,password,displayName,mail});
	      }
	    });
	}

	validateToNextPassword(rule,value,callback){
		const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['repassword'], { force: true });
	    }
	    callback();
	}

	compareToFirstPassword(rule,value,callback){
		const form = this.props.form;
	    if (value && value !== form.getFieldValue('password')) {
	      callback('两次输入的密码不一致');
	    } else {
	      callback();
	    }
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const colProps = {lg:{span:4,offset:10},md:{span:4,offset:10},sm:{span:8,offset:8},xs:24};
		return (
			<LoginWrapper>
				<Form>
					<RowWrapper>
						<Col {...colProps} >
							<h2>用户注册</h2>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<FormItemWrapper>
								{
									getFieldDecorator('username',{
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
									getFieldDecorator('displayName',{
										rules:[
											{ required: true, message: '请输入姓名' }
										]
									})(
										<Input onPressEnter={(e)=>this.handleSubmit(e)} prefix={<Icon type="user" />} placeholder="姓名" />
									)
								}
							</FormItemWrapper>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<FormItemWrapper>
								{
									getFieldDecorator('mail',{
										rules:[
											{ required: true, message: '请输入邮件地址' },
											{ pattern: /^[0-9a-zA-Z]+[0-9a-zA-Z._-]+[0-9a-zA-Z]+@[0-9a-zA-Z]+[0-9a-zA-Z._-]+[0-9a-zA-Z]+$/,message:"请输入正确的邮件地址"}
										]
									})(
										<Input onPressEnter={(e)=>this.handleSubmit(e)} prefix={<Icon type="mail" />} placeholder="邮件地址" />
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
											{ required: true, message: '请输入密码' },
											{ min: 6,max:12, message: '请输入6-12位密码' },
											{ validator:this.validateToNextPassword }
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
							<FormItemWrapper>
								{
									getFieldDecorator('repassword',{
										rules:[
											{ required: true, message: '请再次输入密码' },
											{ min: 6,max:12, message: '请输入6-12位密码' },
											{ validator:this.compareToFirstPassword }
										]
									})(
										<Input onBlur={(e)=>this.handleConfirmBlur(e)} onPressEnter={(e)=>this.handleSubmit(e)} prefix={<Icon type="lock" />} type="password" placeholder="确认密码" />
									)
								}
							</FormItemWrapper>
						</Col>
					</RowWrapper>
					<RowWrapper>
						<Col {...colProps} >
							<Button type="primary" onClick={(e)=>this.handleSubmit(e)}>注册</Button>
						</Col>
					</RowWrapper>
				</Form>
			</LoginWrapper>
		);
	}
}

const mapStateToProps = (state)=>({})

const mapDispatchToProps = (dispatch)=>({
	createUser:({username,password,displayName,mail})=>dispatch(userActions.createUser({username,password,displayName,mail}))
})

export default Form.create()(connect(mapStateToProps,mapDispatchToProps)(Registry));