"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
const grant_js_1 = require("./handlers/grant.js");
const revoke_js_1 = require("./handlers/revoke.js");
const check_js_1 = require("./handlers/check.js");
const list_js_1 = require("./handlers/list.js");
const cache_js_1 = require("./services/cache.js");
const types_1 = require("./lib/types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const start = async () => {
    const nc = await (0, nats_1.connect)({ servers: process.env.NATS_URL });
    await (0, cache_js_1.initKVConnection)(process.env.NATS_URL);
    nc.subscribe(types_1.SUBJECTS.GRANT, {
        callback: async (err, msg) => {
            if (msg)
                await (0, grant_js_1.handleGrant)(msg);
        }
    });
    nc.subscribe(types_1.SUBJECTS.REVOKE, {
        callback: async (err, msg) => {
            if (msg)
                await (0, revoke_js_1.handleRevoke)(msg);
        }
    });
    nc.subscribe(types_1.SUBJECTS.CHECK, {
        callback: async (err, msg) => {
            if (msg) {
                const req = JSON.parse(msg.data.toString());
                await (0, check_js_1.handleCheck)(req, (res) => {
                    msg.respond(Buffer.from(JSON.stringify(res)));
                });
            }
        }
    });
    nc.subscribe(types_1.SUBJECTS.LIST, {
        callback: async (err, msg) => {
            if (msg) {
                const req = JSON.parse(msg.data.toString());
                await (0, list_js_1.handleList)(req, (res) => {
                    msg.respond(Buffer.from(JSON.stringify(res)));
                });
            }
        }
    });
    console.log('Permission service is running...');
};
start().catch(console.error);
