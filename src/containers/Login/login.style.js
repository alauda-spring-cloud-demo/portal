import styled from "styled-components";
import { Row,Form } from "antd";
import Content from "../../components/Content";

export const LoginWrapper = styled(Content)`
	padding-top:80px;
	.ant-btn-primary{
		margin-right:10px;
	}
`;

export const RowWrapper = styled(Row)`
	padding-bottom:10px;
`;

export const FormItemWrapper = styled(Form.Item)`
	margin:0px;
`;