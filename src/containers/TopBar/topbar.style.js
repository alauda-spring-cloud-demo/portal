import styled from "styled-components";

const TopBarWrapper = styled.div`
	display:flex;
	justify-content:space-between;
	align-items:center;
	height:100%;

	.project{
		margin-right:20px;
	}

	img.logo{
		max-height: 53px;
    	max-width: 184px;
    	cursor:pointer;
	}

	img.avata{
		border-radius:50%;
		max-height: 40px;
    	max-width: 40px;
	}

	.leftSide{

	}

	.rightSide{
		display:flex;
		justify-content:center;
		align-items:center;
		.anticon{
			color:#DDDDDD;
			font-size:24px;
			margin-right:24px;
			cursor:pointer;
			padding:5px;
			:hover{
				color:#FFFFFF;
			}
		}
		.user-info{
			cursor: pointer;
			color:#FFFFFF;
			display: flex;
			justify-content:space-between;
			align-items:center;
			img{
				margin-right:10px;
			}
			.username{
				height:20px;
				line-height:20px;
			}
		}
	}

	
`;

const KanbanBarWrapper = styled.div`
	display:${props=>props.display?"flex":"none"};
	justify-content:start;
	align-items:center;
	height:50px;
	padding: 5px 30px 5px 30px;
	font-size:17px;
	font-weight:bold;
	.user,.manager{
		background-color:#DDDDDD;
		width:30px;
		height:30px;
		border-radius:50%;
		display:flex;
		justify-content:center;
		align-items:center;
		cursor:pointer;
	}
	.add-user{
		margin-left:15px;
	}
	.add-manager{
		margin-right:10px;
	}
	.manager{
		background-color:#001529;
		color:#FFFFFF
	}
	.user{
		color:#FFFFFF;
		background-color:#CCCCCC;
		margin-right:-3px;
		box-shadow: -2px 0px #EFEFEF;
	}
`;

const wrapper = { KanbanBarWrapper,TopBarWrapper }

export default wrapper;