"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
// import { handleGrant } from './handlers/grant';
// import { handleRevoke } from './handlers/revoke';
// import { handleCheck } from './handlers/check';
// import { handleList } from './handlers/list';
// filepath: src/index.ts
const grant_js_1 = require("./handlers/grant.js");
const revoke_js_1 = require("./handlers/revoke.js");
const check_js_1 = require("./handlers/check.js");
const list_js_1 = require("./handlers/list.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const start = async () => {
    const nc = await (0, nats_1.connect)({ servers: process.env.NATS_URL });
    const js = nc.jetstream();
    const kv = await js.views.kv('permissions_cache');
    nc.subscribe('permissions.grant', {
        callback: async (err, msg) => {
            if (msg)
                (0, grant_js_1.handleGrant)(msg);
        }
    });
    nc.subscribe('permissions.revoke', {
        callback: async (err, msg) => {
            if (msg)
                (0, revoke_js_1.handleRevoke)(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
        }
    });
    nc.subscribe('permissions.check', {
        callback: async (err, msg) => {
            if (msg)
                (0, check_js_1.handleCheck)(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
        }
    });
    nc.subscribe('permissions.list', {
        callback: async (err, msg) => {
            if (msg)
                (0, list_js_1.handleList)(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
        }
    });
    console.log('Permission service is running...');
};
start().catch(console.error);
