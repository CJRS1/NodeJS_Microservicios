import { Order } from "./orders";
import { v4 as uuidv4 } from 'uuid';

export class OrderFactory {
    /* static sirve para usar esat clase sin crear una instancia */
    static create(productId: string, price: number, quantity: number): Order {
        if (price <= 0) {
            throw new Error("Price has to great than zero");
        }

        if (quantity <= 0) {
            throw new Error("Quantity has to great than zero");
        }

        const transactionId = uuidv4()
        return new Order(transactionId, productId, price, quantity);
    }
}
