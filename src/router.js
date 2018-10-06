import React,{Component} from "react";
import { Route,Redirect,Switch } from "react-router-dom";
import Login from "./containers/Login";
import Projects from "./containers/Projects";
import Kanban from "./containers/Kanban";
import Portal from "./containers/Portal";
import Registry from "./containers/Registry";
import { connect } from "react-redux";
import { ConnectedRouter } from 'connected-react-router';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
	<Route
	    {...rest}
	    render={(props) =>
	      isLoggedIn ? (
	        <Component {...props} />
	      ) : (
	        <Redirect
	          to={{
	            pathname: "/login",
	            state: { from: props.location }
	          }}
	        />
	      )
	    }
	/>
);

class Routers extends Component{
	render(){
		const {history,isLoggedIn} = this.props;
		return (
			<ConnectedRouter history={history}>
				<Switch>
					<Route exact path="/" component={Portal} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/registry" component={Registry} />
					<RestrictedRoute exact path="/projects" component={Projects} isLoggedIn={isLoggedIn} />
					<RestrictedRoute exact path="/kanban" component={Kanban} isLoggedIn={isLoggedIn} />
				</Switch>
			</ConnectedRouter>
		);
	}
}

const mapStateToProps = (state)=>{
	return {
		isLoggedIn: state.user && state.user.token
	}
}

export default connect(mapStateToProps)(Routers);