import { PaymentApplication } from "../../application/payment.application"
import { PaymentFactory } from "../../domain/entities/payment.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: PaymentApplication) { 
        /* con bind lo va a buscar en esta clase y no en otra */
        this.insertPayment = this.insertPayment.bind(this);
    }

    async insertPayment(req: Request, res: Response) {
        const { productId, price, quantity } = req.body
        
        const payment = PaymentFactory.create(productId, price, quantity)
        const paymentSave = await this.app.save(payment)
        res.json(paymentSave)
    }   
}