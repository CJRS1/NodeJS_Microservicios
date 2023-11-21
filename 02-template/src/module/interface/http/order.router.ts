import express, { Request, Response } from 'express'
import Controller from './order.controller'

export default class {

    private readonly expressRouter: express.Router

    constructor(private readonly controller: Controller) {
        this.expressRouter = express.Router()
        this.mountRoutes()
    }

    mountRoutes() {
        this.expressRouter.post("/", async (req: Request, res: Response) =>
            await this.controller.insertOrder(req, res))
    }

    get router() {
        return this.expressRouter
    }

}
