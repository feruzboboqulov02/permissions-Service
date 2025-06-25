import { connect } from 'nats';
// import { handleGrant } from './handlers/grant';
// import { handleRevoke } from './handlers/revoke';
// import { handleCheck } from './handlers/check';
// import { handleList } from './handlers/list';


// filepath: src/index.ts
import { handleGrant } from './handlers/grant.js';
import { handleRevoke } from './handlers/revoke.js';
import { handleCheck } from './handlers/check.js';
import { handleList } from './handlers/list.js';
import dotenv from 'dotenv';




dotenv.config();

const start = async () => {
const nc = await connect({ servers: process.env.NATS_URL });

const js = nc.jetstream();
const kv = await js.views.kv('permissions_cache');

nc.subscribe('permissions.grant', {
callback: async (err, msg) => {
if (msg) handleGrant(msg);
}
});

nc.subscribe('permissions.revoke', {
callback: async (err, msg) => {
if (msg) handleRevoke(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
}
});

nc.subscribe('permissions.check', {
callback: async (err, msg) => {
if (msg) handleCheck(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
}
});

nc.subscribe('permissions.list', {
callback: async (err, msg) => {
if (msg) handleList(JSON.parse(msg.data.toString()), (res) => msg.respond(Buffer.from(JSON.stringify(res))));
}
});

console.log('Permission service is running...');
};

start().catch(console.error);

