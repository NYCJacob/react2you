import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
// fontawesone sprite sheet
import './sprites/regular.svg'
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
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
    <Provider  store={store}><App /></Provider>,
        document.getElementById('root')
);