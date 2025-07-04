import { connect } from 'nats';
import { handleGrant } from './handlers/grant.js';
import { handleRevoke } from './handlers/revoke.js';
import { handleCheck } from './handlers/check.js';
import { handleList } from './handlers/list.js';
import { initKVConnection } from './services/cache.js';
import { SUBJECTS } from './lib/types';

import dotenv from 'dotenv';

dotenv.config();

const start = async () => {
  const nc = await connect({ servers: process.env.NATS_URL });
    await initKVConnection(process.env.NATS_URL!);

  

  nc.subscribe(SUBJECTS.GRANT, {
    callback: async (err, msg) => {
      if (msg) await handleGrant(msg);
    }
  });

  nc.subscribe(SUBJECTS.REVOKE, {
    callback: async (err, msg) => {
      if (msg) await handleRevoke(msg); 
    }
  });

 nc.subscribe(SUBJECTS.CHECK, {
  callback: async (err, msg) => {
    if (msg) await handleCheck(msg);
  }
});

nc.subscribe( SUBJECTS.LIST, {
  callback: async (err, msg) => {
    if (msg) {
      const req = JSON.parse(msg.data.toString());
      await handleList(req, (res) => {
        msg.respond(Buffer.from(JSON.stringify(res)));
      });
    }
  }
});

console.log('Permission service is running...');
};

start().catch(console.error);
