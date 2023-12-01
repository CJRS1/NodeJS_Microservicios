import "reflect-metadata";
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';
import { AuthInfrastructure } from "./module/infrastructure/auth.infrastructure";
import { AuthApplication } from "./module/application/auth.application";

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();

const authInfrastructure = new AuthInfrastructure();

const authApplication = new AuthApplication(
    authInfrastructure
);


(async () => {
    try {
        const listPromises = [
            server.initialize(),
            database.initialize(),
        ];
        await Promise.all(listPromises);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
