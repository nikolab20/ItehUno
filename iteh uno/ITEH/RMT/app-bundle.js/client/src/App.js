"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactRouterDOM = require("react-router-dom");
const Switch = ReactRouterDOM.Switch;
const Route = ReactRouterDOM.Route;
const Component = React.Component;
const Uno_1 = require("../src/components/UNO/Uno");
const Auth_1 = require("../src/containers/Auth/Auth");
const Register_1 = require("../src/containers/Register/Register");
const Layout_1 = require("../src/components/UI/Layout/Layout");
const Logout_1 = require("../src/containers/Auth/Logout/Logout");
class App extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Layout_1.default, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/register", component: Register_1.default }),
                    React.createElement(Route, { path: "/auth", component: Auth_1.default }),
                    React.createElement(Route, { path: "/logout", component: Logout_1.default }),
                    React.createElement(Route, { path: '/', exact: true, component: Uno_1.default })))));
    }
    ;
}
exports.default = App;
//# sourceMappingURL=App.js.map