"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../actions/actionTypes");
var utility_1 = require("../utility");
var initialState = {
    message: null,
    token: null,
    error: null,
    loading: false
};
var authStart = function (state, action) {
    return utility_1.updateObject(state, { error: null, loading: true });
};
var authSuccess = function (state, action) {
    return utility_1.updateObject(state, {
        message: action.message,
        token: action.idToken,
        error: null,
        loading: false
    });
};
var authFail = function (state, action) {
    return utility_1.updateObject(state, {
        error: action.error,
        loading: false
    });
};
var authLogout = function (state, action) {
    return utility_1.updateObject(state, {
        token: null,
        message: null,
        error: null
    });
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};
exports.default = reducer;
//# sourceMappingURL=auth.js.map