import { Order } from '../domain/entities/orders';
import { OrderRepository } from '../domain/repositories/order.repository';

export class OrderApplication {
    private repository: OrderRepository;

    constructor(
        repository: OrderRepository
    ) {
        this.repository = repository;
    }

    async save(order: Order): Promise<Order> {
        return await this.repository.save(order);
    }
}
