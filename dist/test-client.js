"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nats_1 = require("nats");
const cliet_1 = require("./lib/cliet");
async function main() {
    const nats = await (0, nats_1.connect)({ servers: process.env.NATS_URL });
    const client = new cliet_1.PermissionsClient(nats);
    // Пример: выдать разрешение
    const grantRes = await client.grant({
        apiKey: 'test-key',
        module: 'TRADES',
        action: 'create'
    });
    console.log('grant:', grantRes);
    // Пример: проверить разрешение
    const checkRes = await client.check({
        apiKey: 'test-key',
        module: 'TRADES',
        action: 'create'
    });
    console.log('check:', checkRes);
    // Пример: получить список разрешений
    const listRes = await client.list({
        apiKey: 'test-key'
    });
    console.log('list:', listRes);
    // Пример: отозвать разрешение
    const revokeRes = await client.revoke({
        apiKey: 'test-key',
        module: 'TRADES',
        action: 'create'
    });
    console.log('revoke:', revokeRes);
    await nats.close();
}
main().catch(console.error);
