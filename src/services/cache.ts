import { connect, StringCodec, JetStreamClient, KV } from 'nats';
import { Permission } from '../lib/types';

let js: JetStreamClient;
let kv: KV;
const sc = StringCodec();

export async function initKVConnection(natsUrl: string) {
const nc = await connect({ servers: natsUrl });
js = nc.jetstream();
kv = await js.views.kv('permissions_cache');
}

export async function setCachedPermissions(apiKey: string, permissions: Permission[]): Promise<void> {
    if (!kv) throw new Error('KV not initialized. Call initKVConnection() first.');
const json = JSON.stringify(permissions);
await kv.put(apiKey, sc.encode(json));
}

export async function getCachedPermissions(apiKey: string): Promise<Permission[] | null> {
  if (!kv) throw new Error('KV not initialized. Call initKVConnection() first.');

    try {
const entry = await kv.get(apiKey);
if (!entry) return null;
return JSON.parse(sc.decode(entry.value));
} catch {
return null;
}
}