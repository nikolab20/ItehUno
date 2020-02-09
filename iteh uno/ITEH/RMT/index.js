"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouterDOM = require("react-router-dom");
var ReactRedux = require("react-redux");
var Redux = require("redux");
var BrowserRouter = ReactRouterDOM.BrowserRouter;
var Provider = ReactRedux.Provider;
var createStore = Redux.createStore;
var applyMiddleware = Redux.applyMiddleware;
var combineReducers = Redux.combineReducers;
var redux_thunk_1 = require("redux-thunk");
var App_1 = require("../RMT/client/src/App");
var register_1 = require("../RMT/client/src/store/reducers/register");
var auth_1 = require("../RMT/client/src/store/reducers/auth");
var rootReducer = combineReducers({
    register: register_1.default,
    auth: auth_1.default
});
var store = createStore(rootReducer, applyMiddleware(redux_thunk_1.default));
var app = (React.createElement(Provider, { store: store },
    React.createElement(BrowserRouter, null,
        React.createElement(App_1.default, null))));
ReactDOM.render(app, document.getElementById('uno'));
//# sourceMappingURL=index.js.map