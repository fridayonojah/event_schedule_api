require('./register-module-alias');
import 'reflect-metadata'
require('events').EventEmitter.prototype._maxListeners = 100;
// import { ServerHandler } from "./utils/ServerHandler";
import { config } from "constants/Config";
import { createApp } from "./app";
import { ServerHandler } from 'utils/ServerHandler';

export default (async() => {
    const app = await createApp();
    const server = ServerHandler.createExpressServer(app);
    ServerHandler.listenServer(app, server);
})();