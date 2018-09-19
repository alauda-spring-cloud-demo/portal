import { createStore,applyMiddleware,compose } from 'redux';
import reducers from "./reducers";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const loggerMiddleware = (store)=>(next)=>(action)=>{
	console.log(action);
	return next(action);
}

const middlewares = [sagaMiddleware, routeMiddleware ,loggerMiddleware];

const store = createStore(
	connectRouter(history)(reducers),
	compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export {store,history};