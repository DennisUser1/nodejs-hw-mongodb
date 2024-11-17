import 'dotenv/config';
import {initMongoConnection} from './db/initMongoConnection.js';
import {setupServer} from './server.js';

(async () => {
    await initMongoConnection().catch(console.dir);
    setupServer(); 
})();