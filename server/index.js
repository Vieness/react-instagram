import "regenerator-runtime/runtime.js";

import config from './config';
import appLoader from './loaders';
import express from 'express';

/**
 * @desc Function that starts the server
 **/
export async function startServer() {
    const app = express();

    // Load an application
    await appLoader({app, config});
    
    app.listen(config.PORT, err => {
        if (err) {
            console.log('Error has just happened!');
            process.exit(1);
            return;
        }

        console.log(`
        ################################################
        🛡️ Server listening on port: ${config.PORT} and version: ${config.SERVICE_PREFIX}/v${config.VERSION}
        ################################################`);
    });
}

startServer();

