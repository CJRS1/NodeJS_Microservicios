import express, { NextFunction, Request, Response } from 'express'
import Controller from './order.controller'
import { BadRequestErrorException } from '../../../core/exceptions/badrequest.exception'
import { validate } from 'class-validator'
import { InsertValidator } from './validators/insert.validator'

export default class {

    private readonly expressRouter: express.Router

    constructor(private readonly controller: Controller) {
        this.expressRouter = express.Router()
        this.mountRoutes()
    }

    validator(instance: any) {
        return (req: Request, res: Response, next: NextFunction) => {
            const body = req.body;
            Object.assign(instance, body);
            validate(instance).then((errors) => {
                if (errors.length > 0) {
                    throw new BadRequestErrorException(JSON.stringify(errors));
                } else {
                    next();
                }
            });
        };
    }

    mountRoutes() {
        /*         // this.expressRouter.post("/", async (req: Request, res: Response) =>
                //     await this.controller.insertOrder(req, res)) */
        this.expressRouter.post(
            "/",
            this.validator(new InsertValidator()),
            this.controller.insertOrder
        );
    }

    get router() {
        return this.expressRouter
    }

}
