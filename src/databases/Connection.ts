import { DataSource, DataSourceOptions} from "typeorm";
import { MysqlDriver } from "typeorm/driver/mysql/MysqlDriver";
import { PoolConnection } from "mysql2";
import { OrmConfig } from "constants/TypeormConfig";
import { Logger } from "logging/Logger";
import { sleep } from "helpers/Helpers";
import { Users } from "./entities/Users";

// Handle unstable connection lost to DB
function connectionGuard(connection: DataSource) {
    if (connection.driver instanceof MysqlDriver) {
        const pool = connection.driver.pool as PoolConnection;

        // Add handler on pool error event
        pool.on('error', async (err: any) => {
            Logger.error(err, 'Connection pool erring out, Reconnecting...');
            try {
               await connection.destroy(); 
            } catch (innerErr) {
                Logger.error(innerErr, 'Failed to close connection')
            }

            while (!connection.isInitialized) {
                try {
                    await connection.initialize();
                    Logger.info('Reconnect to Db');
                } catch (error) {
                    Logger.info('Reconnect Error')
                }

                if (!connection.isInitialized) {
                    await sleep(500);
                }
            }
        });
      
    }
}

export async function connect() {
    let connection: DataSource;
    let isInitialized = false;

    Logger.info('Connecting to DB...');
    while (!isInitialized) {
        try {
            connection = new DataSource(OrmConfig as DataSourceOptions);
            await connection.initialize();
            isInitialized =  connection.isInitialized;
            
        } catch (error) {
            Logger.error(error, 'CreateConnection Error');
        }

        isInitialized ? await connection.runMigrations() : await sleep(500);
    }
    Logger.info('Connected to Db');
    connectionGuard(connection);
    return connection;
    
}

// export async function getRepository(entity: any) {
//     const connection = await connect()
//     return connection.getRepository(Users)
// }