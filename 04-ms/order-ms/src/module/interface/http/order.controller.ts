import { OrderApplication } from "../../application/order.application"
import { OrderFactory } from "../../domain/entities/order.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: OrderApplication) { 
        /* con bind lo va a buscar en esta clase y no en otra */
        this.insertOrder = this.insertOrder.bind(this);
    }

    async insertOrder(req: Request, res: Response) {
        const { productId, price, quantity } = req.body
        
        const order = OrderFactory.create(productId, price, quantity)
        const orderSave = await this.app.save(order)
        res.json(orderSave)
    }   
}