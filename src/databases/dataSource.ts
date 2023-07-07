import {DataSource, DataSourceOptions, Entity} from 'typeorm';
import { OrmConfig } from "constants/TypeormConfig";

export const connection = new DataSource(OrmConfig as DataSourceOptions);
connection.getRepository(Entity)
