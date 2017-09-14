import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './components/App';

import { BrowserRouter, Route } from 'react-router-dom';
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'


const logger = store => next => action => {
      console.group(action.type)
      console.info('dispatching', action)
      let result = next(action)
          console.log('next state', store.getState())
          console.groupEnd(action.type)
          return result
        }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


//if redux reducer exists invoke redux devtools
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
);

ReactDOM.render(
    <Provider  store={store}>
        <BrowserRouter>
            <Route path="/" component={App}/>

        </BrowserRouter>
    </Provider>,
        document.getElementById('root')
);