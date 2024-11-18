import 'dotenv/config';
import {initMongoConnection} from './db/initMongoConnection.js';
import {setupServer} from './server.js';

const bootstrap = async () => {
    await initMongoConnection().catch(console.dir);
    setupServer();
};
bootstrap();
