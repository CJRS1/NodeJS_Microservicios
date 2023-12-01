import mongoose from "mongoose";
import { Bootstrap } from "./bootstrap";

export default class DataBaseBoostrap extends Bootstrap {
    initialize(): Promise<boolean | Error> {
        return new Promise<boolean | Error>((resolve, reject) => {
            const username = process.env.MONGO_USERNAME || "root"
            const password = process.env.MONGO_PASSWORD || "root"
            const database = process.env.MONGO_DATABASE || "test"
            const host = process.env.MONGO_HOST || "localhost"
            const port = process.env.MONGO_PORT || 27017
            const authSource = process.env.MONGO_AUTH_SOURCE || "admin"

            const url = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`

            /* Máximo de conexiones */
            const options = { maxPoolSize: 10 }

            mongoose.connect(url, options)
                .then(() => {
                    resolve(true)
                    console.log("Connected to Database")
                })
                .catch((err) => {
                    reject(err)
                    console.log("Database is not connected")
                });
        })
    }
}