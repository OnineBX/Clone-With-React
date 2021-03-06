"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTimesStamp = function () {
    return new Date().toISOString();
};
var info = function (namespace, message, object) {
    if (object) {
        console.log("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message, object);
    }
    else {
        console.log("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message);
    }
};
var warn = function (namespace, message, object) {
    if (object) {
        console.warn("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message, object);
    }
    else {
        console.warn("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message);
    }
};
var error = function (namespace, message, object) {
    if (object) {
        console.error("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message, object);
    }
    else {
        console.error("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message);
    }
};
var debug = function (namespace, message, object) {
    if (object) {
        console.debug("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message, object);
    }
    else {
        console.debug("[" + getTimesStamp() + "][INFO][" + namespace + "] " + message);
    }
};
exports.default = {
    info: info,
    warn: warn,
    error: error,
    debug: debug
};
