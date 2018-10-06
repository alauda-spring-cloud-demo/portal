import styled from "styled-components";
import Content from "../../components/Content";
import { Row,Col } from "antd";

export const RowWrapper = styled(Row)`
	padding-bottom:10px;
`

export const ColWrapper = styled(Col)`
	.content{
		color:${props=>props.hover?'#000000':'#FFFFFF'};
		background-color:#001529;
		cursor:pointer;
		font-size:18px;
		height:120px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display:flex;
		justify-content:center;
		align-items:center;
		&:hover{
			background-color:#EEEEEE;
			color:#000000;
			border:1px dashed #001529;
		}
		&.action{
			color:#000000;
			background-color:#EEEEEE;
			&:hover{
				color:#000000;
				border:1px dashed #001529;
			}
		}
	}
`

export const ContentWrapper = styled(Content)`
	padding-top:80px;
`;