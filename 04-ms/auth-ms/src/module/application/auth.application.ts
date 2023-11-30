import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Auth } from '../domain/entities/auth';
import { BrokerRepository } from '../domain/repositories/broker.repository';
import { AuthRepository } from '../domain/repositories/auth.repository';

export class AuthApplication {
    private repositoryAuth: AuthRepository;

    constructor(
        repositoryAuth: AuthRepository,
    ) {
        this.repositoryAuth = repositoryAuth;

    }

    async save(auth: Auth): Promise<Auth> {
        const authResult = await this.repositoryAuth.save(auth);
        if (authResult.isErr()) {
            throw new InternalServerErrorException(authResult.error.message);
        }


        return authResult.value;
    }

}
