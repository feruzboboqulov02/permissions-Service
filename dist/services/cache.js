"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKVConnection = initKVConnection;
exports.setCachedPermissions = setCachedPermissions;
exports.getCachedPermissions = getCachedPermissions;
const nats_1 = require("nats");
let js;
let kv;
const sc = (0, nats_1.StringCodec)();
async function initKVConnection(natsUrl) {
    const nc = await (0, nats_1.connect)({ servers: natsUrl });
    js = nc.jetstream();
    kv = await js.views.kv('permissions_cache');
}
async function setCachedPermissions(apiKey, permissions) {
    const json = JSON.stringify(permissions);
    await kv.put(apiKey, sc.encode(json));
}
async function getCachedPermissions(apiKey) {
    try {
        const entry = await kv.get(apiKey);
        if (!entry)
            return null;
        return JSON.parse(sc.decode(entry.value));
    }
    catch {
        return null;
    }
}
