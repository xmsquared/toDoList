import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

const store =  createStore(
    combineReducers({
      i18n: i18nReducer
    }),
    applyMiddleware(thunk)
);

export default store;