import { InternalServerErrorException } from '../../core/exceptions/internalserver.exception';
import { Auth } from '../domain/entities/auth';
import { AuthRepository, Tokens } from '../domain/repositories/auth.repository';

export class AuthApplication {
    private repositoryAuth: AuthRepository;

    constructor(
        repositoryAuth: AuthRepository,
    ) {
        this.repositoryAuth = repositoryAuth;
    }

    async register(auth: Auth): Promise<Auth> {
        const authResult = await this.repositoryAuth.register(auth);
        if (authResult.isErr()) {
            throw new InternalServerErrorException(authResult.error.message);
        }
        return authResult.value;
    }

}
