import { AuthApplication } from "../../application/auth.application"
import { AuthFactory } from "../../domain/entities/auth.factory"
import { Request, Response } from "express"
import { Tokens } from "../../domain/repositories/auth.repository";

export default class {
    constructor(private readonly app: AuthApplication) {
        /* con bind lo va a buscar en esta clase y no en otra */
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.validateAccessToken = this.validateAccessToken.bind(this);
        this.getNewAccesToken = this.getNewAccesToken.bind(this);
    }

    async register(req: Request, res: Response) {
        const { name, email, password } = req.body

        const auth = await AuthFactory.create(name, email, password)
        const authSave = await this.app.register(auth)
        res.json(authSave)
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const tokens: Tokens | null = await this.app.login(email, password);
        res.json(tokens);
    }

    async validateAccessToken(req: Request, res: Response) {
        const { token } = req.body;
        console.log(token)
        try {
            const payload = await this.app.validateAccessToken(token);

            res.json(payload);
        } catch (error) {
            res.status(error.status).json(error.message);
        }
    }

    async getNewAccesToken(req: Request, res: Response) {
        const { refreshToken } = req.body;

        const tokens: Tokens | null = await this.app.getNewAccesToken(refreshToken);

        if (tokens) {
            res.json(tokens);
        } else {
            res.status(401).json("Unauthorized");
        }
    }
}