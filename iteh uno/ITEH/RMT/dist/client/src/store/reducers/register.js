"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = require("../actions/actionTypes");
var utility_1 = require("../utility");
var initialState = {
    message: null,
    error: null,
    loading: false
};
var registerStart = function (state, action) {
    return utility_1.updateObject(state, { error: null, loading: true });
};
var registerSuccess = function (state, action) {
    return utility_1.updateObject(state, {
        message: action.message,
        error: null,
        loading: false
    });
};
var registerFail = function (state, action) {
    return utility_1.updateObject(state, {
        error: action.error,
        loading: false
    });
};
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes.REGISTER_START: return registerStart(state, action);
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_FAIL: return registerFail(state, action);
        default: return state;
    }
};
exports.default = reducer;
//# sourceMappingURL=register.js.map