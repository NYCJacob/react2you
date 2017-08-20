import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import reducer from './reducers'


const store = createStore(reducer);
console.log(store.getState());
ReactDOM.render(
    <Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'))

