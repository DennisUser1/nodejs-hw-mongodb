import 'dotenv/config';
import {initMongoConnection} from './db/initMongoConnection.js';
import {setupServer} from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/authConstants.js';

const bootstrap = async () => {
    await initMongoConnection().catch(console.dir);
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};
void bootstrap();
