import React,{ Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router"
import { Button,Col,Icon,Modal,Input,Form } from "antd";
import { ContentWrapper,RowWrapper,ColWrapper } from "./project.style";
import projectAction from "../../redux/project/actions";
import classNames from "classnames";

class Projects extends Component{

	constructor(){
		super();
		this.state = {
			showModal:false
		}
		this.showModal = this.showModal.bind(this);
		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount(){
		this.props.listProjects();
	}

	showModal(){
		this.setState({showModal:true})
	}

	handleOk(){
		this.handleSubmit();
	}

	handleCancel(){
		this.setState({showModal:false})
	}

	handleSubmit(){
		let { createProject } = this.props;
		const { getFieldValue,validateFields,setFieldsValue } = this.props.form;
		validateFields((err,values)=>{
			if(!err){
				const projectName = getFieldValue("projectName");
				createProject({projectName});
				this.setState({showModal:false})
				setFieldsValue({projectName:""});
			}
		})
	}
	
	render(){
		let { projects,hasAdvRole } = this.props;
		let { push } = this.props;
		let { getFieldDecorator } = this.props.form;

		let rows = projects.reduce((prev,cur,idx)=>{
			if(idx % 4 == 0){
				prev.push([])
			}
			prev[prev.length - 1].push(cur);
			return prev;
		},[]);

		let NewProjectButton = (offset)=>(
			<ColWrapper 
				offset={offset}
				span={4}
				key={"new_project"}>
				<Icon 
					title="创建新项目" 
					className="content action" 
					type="plus" 
					onClick={this.showModal}
				/>
			</ColWrapper>
		);

		return(
			<ContentWrapper>
				{
					rows.map((row,rowIndex)=>
						<RowWrapper gutter={10} key={rowIndex}>
							{
								row.map((p,projectIndex)=>
									<ColWrapper 
										title={p.name}
										span={4} 
										offset={projectIndex == 0?4:0} 
										key={p.id}>
										<div 
											onClick={()=>push(`/kanban?project=${p.id}`)} 
											className="content">
											{p.name}
										</div>
									</ColWrapper>
								)
							}
							{
								row.length %4!=0 && hasAdvRole?
								NewProjectButton(0):[]
							}
						</RowWrapper>
					)
				}
				{
					projects.length %4 == 0 && hasAdvRole?
					<RowWrapper  gutter={10}>
						{NewProjectButton(4)}
					</RowWrapper>:[]
				}
				<Modal
		          title="创建新项目"
		          visible={this.state.showModal}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          width={300}
		          okText="确定"
		          cancelText="取消"
		        >
		        	<Form.Item>
		        	{
		        		getFieldDecorator('projectName',
		        			{
		        				rules:[
		        					{required:true,message:'请输入项目名称'}
		        				]
		        			})(
		        			<Input placeholder="项目名称" onPressEnter={this.handleSubmit} />
		        		)
		        	}
		        	</Form.Item>
		        </Modal>
			</ContentWrapper>
		);
	}
}

const mapStateToProps = (state)=>({
	projects:state.project.projects,
	hasAdvRole:state.user.currentUser.authorities.find(role=>role =="ROLE_ADMIN" || role == "ROLE_PMO")
});

const mapDispatchToProps = (dispatch)=>({
	listProjects:()=>dispatch(projectAction.list.pend()),
	createProject:({projectName})=>dispatch(projectAction.create.pend({projectName})),
	push:(obj)=>dispatch(push(obj))
})

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(Projects));