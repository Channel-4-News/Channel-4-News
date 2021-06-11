import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';
import { createLogger } from 'redux-logger';

//Redux Middleware
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);

//Redux Store
const _store = createStore(rootReducer, middleware);

export default _store;
