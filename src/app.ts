require('dotenv').config();
const express = require("express");
import {Express} from 'express';
import {useContainer } from 'routing-controllers';
import { Container } from "typeorm-typedi-extensions";
import {connect} from './databases/Connection';
import { RouteHandle } from 'utils/Utils';
import { Middleware } from 'middlewares/Middleware';
import { OpenApiConfiguration } from 'utils/OpenApiConfiguration';

export async function createApp(): Promise<Express> {
    const app = express();
    app.set('port', process.env.SERVER_PORT ?? 3900);
    RouteHandle.applyMiddleware(Middleware.handle(), app);
    RouteHandle.enableCors(app);

    useContainer(Container)
    const routingControllersOptions = RouteHandle.RoutingControllersOptions();
    OpenApiConfiguration.openApiConfiguration(app);

    await connect();
    RouteHandle.applyRoutes(app, routingControllersOptions);
    return app;
}