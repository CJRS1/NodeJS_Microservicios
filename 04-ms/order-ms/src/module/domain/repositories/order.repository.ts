import { OrderResult } from '../../infrastructure/order.infrastructure';
import { Order } from '../entities/orders';

export interface OrderRepository {
    save(order: Order): Promise<OrderResult>;
}
