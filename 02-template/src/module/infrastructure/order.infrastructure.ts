import { Order } from '../domain/entities/orders';
import { OrderRepository } from '../domain/repositories/order.repository';
import Model from './models/order.model';

export class OrderInfrastructure implements OrderRepository {
    async save(order: Order): Promise<Order> {
        await Model.create(order);
        return order;
    }
}
