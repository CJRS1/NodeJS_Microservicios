import { AuthApplication } from "../../application/auth.application"
import { AuthFactory } from "../../domain/entities/auth.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: AuthApplication) { 
        /* con bind lo va a buscar en esta clase y no en otra */
        this.insertAuth = this.insertAuth.bind(this);
    }

    async insertAuth(req: Request, res: Response) {
        const { productId, price, quantity } = req.body
        
        const auth = AuthFactory.create(productId, price, quantity)
        const authSave = await this.app.save(auth)
        res.json(authSave)
    }   
}