import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers/rootReducer'; // Assuming you have an index.js in the reducers folder to combine reducers

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;