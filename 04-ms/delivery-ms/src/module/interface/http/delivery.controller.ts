import { DeliveryApplication } from "../../application/delivery.application"
import { DeliveryFactory } from "../../domain/entities/delivery.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: DeliveryApplication) { 
        /* con bind lo va a buscar en esta clase y no en otra */
        this.insertDelivery = this.insertDelivery.bind(this);
    }

    async insertDelivery(req: Request, res: Response) {
        const { productId, price, quantity } = req.body
        
        const delivery = DeliveryFactory.create(productId, price, quantity)
        const deliverySave = await this.app.save(delivery)
        res.json(deliverySave)
    }   
}