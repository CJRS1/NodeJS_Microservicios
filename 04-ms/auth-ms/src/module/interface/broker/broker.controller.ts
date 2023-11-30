import { OrderApplication } from '../../application/auth.application';

export default class {
    constructor(private readonly orderApplication: OrderApplication) { }

    async listen() {
        await this.orderApplication.receive();
        console.log("Broker listening");
    }
}
