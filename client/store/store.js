import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(rootReducer, middleware);

export default store;
