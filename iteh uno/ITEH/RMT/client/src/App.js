"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactRouterDOM = require("react-router-dom");
var Switch = ReactRouterDOM.Switch;
var Route = ReactRouterDOM.Route;
var Component = React.Component;
var Uno_1 = require("../src/components/UNO/Uno");
var Auth_1 = require("../src/containers/Auth/Auth");
var Register_1 = require("../src/containers/Register/Register");
var Layout_1 = require("../src/components/UI/Layout/Layout");
var Logout_1 = require("../src/containers/Auth/Logout/Logout");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(Layout_1.default, null,
                React.createElement(Switch, null,
                    React.createElement(Route, { path: "/register", component: Register_1.default }),
                    React.createElement(Route, { path: "/auth", component: Auth_1.default }),
                    React.createElement(Route, { path: "/logout", component: Logout_1.default }),
                    React.createElement(Route, { path: '/', exact: true, component: Uno_1.default })))));
    };
    ;
    return App;
}(Component));
exports.default = App;
//# sourceMappingURL=App.js.map