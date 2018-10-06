import styled from "styled-components";
import Content from "../../components/Content";

const ContentWrapper = styled(Content)`
	.ant-row{
		margin-bottom: 20px;
	}
	.ant-card-actions{
		li{
			span{
				width:100%;
				.anticon-check>svg{
					fill:green;
				}
				.anticon-close>svg{
					fill:red;
				}
			}
		}
	}
	.ant-card-body{
		background-color:#EFEFEF;
		padding:10px;
	}
	.todo{
		background-color:#FFFFFF;
		padding:10px;
		border-radius:5px;
		margin-bottom:10px;
		display:flex;
		justify-content:space-between;
		.todo-user{
			border-radius:50%;
			width:30px;
			height:30px;
			background-color:#CCCCCC;
			display:flex;
			justify-content:center;
			align-items:center;
			font-weight:bold;
			margin-right:10px;
		}
		.todo-opts{
			display:flex;
			justify-content:space-between;
			align-items:center;
			.anticon-bars>svg{
				cursor:pointer;
				&:hover{
					fill:#1890ff;
				}
			}
		}
	}
	.updating{
		background-color:#DDDDDD;
	}
`;

export default ContentWrapper;