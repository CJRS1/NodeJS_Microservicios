import { err, ok, Result } from 'neverthrow'

import { IError } from '../../core/exceptions/error.exception'
import { AuthRepository } from '../domain/repositories/auth.repository'
import Model from './models/auth.model'
import { Auth } from '../domain/entities/auth'

export type AuthResult = Result<Auth, IError>

export class AuthInfrastructure implements AuthRepository {
    async save(auth: Auth): Promise<AuthResult> {
        try {
            await Model.create(auth);
            return ok(auth);
        } catch (error) {
            const resultErr = new IError(error.message);
            resultErr.status = 500;
            return err(resultErr);
        }
    }
}
