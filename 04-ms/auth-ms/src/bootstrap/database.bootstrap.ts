import mongoose from "mongoose";
import { Bootstrap } from "./bootstrap";

export default class DataBaseBoostrap extends Bootstrap {
    initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const username = process.env.MONGO_USERNAME || "root"
            const password = process.env.MONGO_PASSWORD || "root"
            const database = process.env.MONGO_DATABASE || "test"
            /* usaer 127.0.0.1 */
            const host = process.env.MONGO_HOST || "127.0.0.1"
            const port = process.env.MONGO_PORT || 27017
            const authSource = process.env.MONGO_AUTH_SOURCE || "admin"
            const xd = process.env.xd
            console.log(xd)
            
            const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`

            /* Máximo de conexiones */ 
            console.log(url)
            const options = { maxPoolSize: 10 }

            mongoose.connect(url, options)
                .then(() => {
                    resolve(true)
                    console.log(`Connected to Database on ${port}`)
                })
                .catch((err) => {
                    reject(err)
                    console.log(`Database is not connected on ${port}`)
                });
        })
    }
}