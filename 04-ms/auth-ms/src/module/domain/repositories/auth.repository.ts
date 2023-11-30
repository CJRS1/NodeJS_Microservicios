import { AuthResult } from '../../infrastructure/auth.infrastructure';
import { Auth } from '../entities/auth';

export interface AuthRepository {
    save(auth: Auth): Promise<AuthResult>;
}
