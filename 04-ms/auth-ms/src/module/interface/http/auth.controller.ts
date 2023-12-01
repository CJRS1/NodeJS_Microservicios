import { AuthApplication } from "../../application/auth.application"
import { AuthFactory } from "../../domain/entities/auth.factory"
import { Request, Response } from "express"

export default class {
    constructor(private readonly app: AuthApplication) {
        /* con bind lo va a buscar en esta clase y no en otra */
        this.register = this.register.bind(this);
    }

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body

        const auth = await AuthFactory.create(name, email, password)
        const authSave = await this.app.register(auth)
        res.json(authSave)
    }

    // async login(req: Request, res: Response) {
    //     const { email, password } = req.body;
    //     const tokens: Tokens | null = await this.app.login(email, password);
    //     res.json(tokens);
    // }

}