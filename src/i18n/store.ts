import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { i18nReducer } from 'react-redux-i18n';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const store =  createStore(
    combineReducers({
      i18n: i18nReducer
    }),
    enhancer
);
/* eslint-enable */

export default store;