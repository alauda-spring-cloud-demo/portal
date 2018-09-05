import { Layout } from "antd";
import styled from "styled-components";

const { Content } = Layout;

const ContentWrapper = styled(Content)`
	padding:24px;
	background-color:#FFFFFF;
	min-height:${document.body.clientHeight - (64 * 2) }px
`;

export default ContentWrapper;