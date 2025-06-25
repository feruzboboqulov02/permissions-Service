"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const log = (event, details) => {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), event, ...details }));
};
exports.log = log;
