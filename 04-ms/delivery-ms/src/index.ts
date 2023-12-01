import "reflect-metadata";
import BrokerBootstrap from './bootstrap/broker.bootstrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';
import { DeliveryInfrastructure } from "./module/infrastructure/delivery.infrastructure";
import { BrokerInfrastructure } from "./module/infrastructure/broker.infrastructure";
import { DeliveryApplication } from "./module/application/delivery.application";
import BrokerController from './module/interface/broker/broker.controller';

const server = new ServerBootstrap();
const database = new DatabaseBootstrap();
const broker = new BrokerBootstrap();

const deliveryInfrastructure = new DeliveryInfrastructure();

const brokerInfrastructure = new BrokerInfrastructure();
const deliveryApplication = new DeliveryApplication(
    deliveryInfrastructure,
    brokerInfrastructure
);

const brokerController = new BrokerController(deliveryApplication);

(async () => {
    try {
        const listPromises = [
            server.initialize(),
            database.initialize(),
            broker.initialize(),
        ];
        await Promise.all(listPromises);

        /*     await server.initialize();
        await database.initialize();
        await broker.initialize(); */
        await brokerController.listen();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
