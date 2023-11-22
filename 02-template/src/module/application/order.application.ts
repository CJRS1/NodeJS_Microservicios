import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Order } from '../domain/entities/orders';
import { OrderRepository } from '../domain/repositories/order.repository';

export class OrderApplication {
    private repositoryOrder: OrderRepository;

    constructor(
        repositoryOrder: OrderRepository
    ) {
        this.repositoryOrder = repositoryOrder;
    }

    async save(order: Order): Promise<Order> {
        const orderResult = await this.repositoryOrder.save(order);
        if (orderResult.isErr()) {
            throw new InternalServerErrorException(orderResult.error.message);
        }

        // await this.repositoryBroker.sent(orderResult.value);

        return orderResult.value;
    }
}
