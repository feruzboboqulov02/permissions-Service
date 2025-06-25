"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = logEvent;
exports.logError = logError;
function logEvent(event, details) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), event, ...details }));
}
function logError(event, error) {
    console.error(JSON.stringify({ timestamp: new Date().toISOString(), event, error: error?.message || error }));
}
