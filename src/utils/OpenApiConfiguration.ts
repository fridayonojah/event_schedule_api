import * as basicAuth from "express-basic-auth";
import { Express } from "express";
import * as swaggerUiExpress from 'swagger-ui-express';
import { openApiCredentials } from "constants/Config";
import * as swaggerDoc from 'swagger-jsdoc';
import * as glob from 'glob';
import * as YAML from 'yamljs';

export class OpenApiConfiguration { 
    public static openApiConfiguration(app: Express): void{

        const responseConfig = OpenApiConfiguration.loadResponses()
        const swaggerDefinition = {
            info: {
                title: 'Event Management Api: NodeJs',
                version: '1.0.0',
                description: 'Endpoints that serves the event management APIs'
            },
            openapi: '3.0.2',
            components: {
                ...responseConfig,
            },
        };

        const optipons = {
            swaggerDefinition,
            apis: [`${process.cwd()}/src/**/*.docs.yaml`]
        };
        const swaggerSpec = swaggerDoc(optipons);
        app.use(
          '/api/docs',
          basicAuth({
            users: openApiCredentials(),
            challenge: true
          }),
          swaggerUiExpress.serve,
          swaggerUiExpress.setup(swaggerSpec)
        );
    }

    public static getResponsePaths(): string[] {
        return [
            ...glob.sync(`${process.cwd()}/src/**/responses/*.yaml`),
            ...glob.sync(`${process.cwd()}/dist/**/responses/*.yaml`)
        ];
    }

    public static loadAndMergeData(files: string[]): any {
        return files
            .map((file) => YAML.load(file))
            .reduce((result, endpoint) => {
                for (const path of Object.keys(endpoint)) {
                    if (!(path in result))  return result[path] = {};
                    result[path] = {...result[path], ...endpoint[path]};     
                }
                return result;
            }, {});
    }

    public static loadResponses(): any {
        const responses_paths = OpenApiConfiguration.getResponsePaths();
        const responses = process.env.NODE_ENV === 'testing' ? {} : OpenApiConfiguration.loadAndMergeData(responses_paths);
        return {responses};
    }
}