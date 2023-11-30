import express, { Application } from 'express'
import Controller from './module/interface/http/auth.controller';
import AuthRouter from './module/interface/http/auth.router';
import { AuthInfrastructure } from './module/infrastructure/auth.infrastructure';
import { AuthApplication } from './module/application/auth.application';


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
        const infrastructure = new AuthInfrastructure()
        const application = new AuthApplication(infrastructure)
        const controller = new Controller(application)
        const router = new AuthRouter(controller)

        this.expressApp.use("/auth", router.router)
    }
    mountErrors() { }

    get app() {
        return this.expressApp
    }
}

export default new App().app


