import { StoreApplication } from "../../application/store.application"
import { StoreFactory } from "../../domain/entities/store.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: StoreApplication) { 
        /* con bind lo va a buscar en esta clase y no en otra */
        this.insertStore = this.insertStore.bind(this);
    }

    async insertStore(req: Request, res: Response) {
        const { productId, price, quantity } = req.body
        
        const store = StoreFactory.create(productId, price, quantity)
        const storeSave = await this.app.save(store)
        res.json(storeSave)
    }   
}