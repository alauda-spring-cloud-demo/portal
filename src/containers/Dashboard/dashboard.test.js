import React from "react";
import { store } from "../../redux/store";
import Enzyme,{ mount } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import { Provider,push } from "react-redux";
import Dashboard from "./index";
import userActions from "../../redux/user/actions";

Enzyme.configure({ adapter:new Adapter() });

let wrapper;

describe("展示测试",()=>{

	beforeEach(()=>{
		wrapper = mount(
			<Provider store={store}>
				<Dashboard />
			</Provider>
		);
	});

	test("Dashboard Page",()=>{
		expect(wrapper.find("h1").text()).toContain("Dashboard Page");
	})


})