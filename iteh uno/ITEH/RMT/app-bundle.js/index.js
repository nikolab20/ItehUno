"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const ReactRouterDOM = require("react-router-dom");
const ReactRedux = require("react-redux");
const Redux = require("redux");
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const Provider = ReactRedux.Provider;
const createStore = Redux.createStore;
const applyMiddleware = Redux.applyMiddleware;
const combineReducers = Redux.combineReducers;
const redux_thunk_1 = require("redux-thunk");
const App_1 = require("../RMT/client/src/App");
const register_1 = require("../RMT/client/src/store/reducers/register");
const auth_1 = require("../RMT/client/src/store/reducers/auth");
const rootReducer = combineReducers({
    register: register_1.default,
    auth: auth_1.default
});
const store = createStore(rootReducer, applyMiddleware(redux_thunk_1.default));
const app = (React.createElement(Provider, { store: store },
    React.createElement(BrowserRouter, null,
        React.createElement(App_1.default, null))));
ReactDOM.render(app, document.getElementById('uno'));
//# sourceMappingURL=index.js.map