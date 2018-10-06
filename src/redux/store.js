import { createStore,applyMiddleware,compose } from 'redux';
import reducers from "./reducers";
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from "history";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas";
import logger from "redux-logger";

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const middlewares = [sagaMiddleware, routeMiddleware ,logger];

const store = createStore(
	connectRouter(history)(reducers),
	compose(applyMiddleware(...middlewares))
);

// const rootSagaTask = sagaMiddleware.run(rootSaga);

const foreverRun = (saga)=>{
	const task = sagaMiddleware.run(saga)
	task.done.catch(()=>{
		foreverRun(saga);
	})
}

foreverRun(rootSaga);

export {store,history};