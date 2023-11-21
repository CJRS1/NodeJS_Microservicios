import { Order } from '../entities/orders';

export interface OrderRepository {
    save(order: Order): Promise<Order>;
}
