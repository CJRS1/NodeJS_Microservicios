import http from 'http'
import app from '../app'
import { Bootstrap } from './bootstrap'

export default class ServerBootstrap extends Bootstrap {
    initialize(): Promise<boolean | Error> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(app);
            const port = process.env.PORT || 3000;

            server
                .listen(port)
                .on("listening", () => {
                    resolve(true)
                    console.log(`Listening on port ${port}`)
                })
                .on("error", (err) => {
                    reject(err)
                    console.log(err)
                })
        })
    }
}