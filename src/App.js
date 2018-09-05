import React, { Component } from 'react';
import { store,history } from "./redux/store";
import { Provider } from "react-redux";
import Routers from "./router";
import userActions from "./redux/user/actions";
import { FooterWrapper } from "./App.style";
import TopBar from "./containers/TopBar";
import { Layout,Divider } from "antd";
import api from "./api";

class App extends Component{
  render(){
    return (
      <Provider store={store}>
      	<Layout>
      		<TopBar />
    		<Routers history={history} />
    		<FooterWrapper>
    			<Divider />
    			© 2018 <a target="_blank" rel="noopener noreferrer" href="http://alauda.io">Alauda.io</a>
    		</FooterWrapper>
    	</Layout>
      </Provider>
    );
  }
}

store.dispatch(userActions.checkAuthorization())
api.init();

export default App;
