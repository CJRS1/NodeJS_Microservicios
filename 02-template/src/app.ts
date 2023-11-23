import express, { Application } from 'express'
import Controller from './module/interface/http/order.controller';
import OrderRouter from './module/interface/http/order.router';
import { OrderInfrastructure } from './module/infrastructure/order.infrastructure';
import { OrderApplication } from './module/application/order.application';


class App {
    private readonly expressApp: Application

    constructor() {
        this.expressApp = express()
        this.mountMiddlewares()
        this.mountRoutes()
        this.mountErrors()
    }

    mountMiddlewares() {
        this.expressApp.use(express.json())
        this.expressApp.use(express.urlencoded({ extended: true }))
    }

    mountRoutes() {
        const infrastructure = new OrderInfrastructure()
        const application = new OrderApplication(infrastructure)
        const controller = new Controller(application)
        const router = new OrderRouter(controller)

        this.expressApp.use("/order", router.router)
    }
    mountErrors() { }

    get app() {
        return this.expressApp
    }
}

export default new App().app


