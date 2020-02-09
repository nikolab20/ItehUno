import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactRouterDOM from 'react-router-dom';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

const BrowserRouter = ReactRouterDOM.BrowserRouter;
const Provider = ReactRedux.Provider;
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;
const combineReducers = Redux.combineReducers;

import thunk from 'redux-thunk';
import registerReducer from '../RMT/client/src/store/reducers/register';
import authReducer from '../RMT/client/src/store/reducers/auth';
import App from './client/src/App';

const rootReducer = combineReducers({
    register: registerReducer,
    auth: authReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('uno'));
