import useCase from '../../shared/models/useCase';
import User from '../model/User';
import PasswordPort from '../ports/PasswordPort';
import RepositoryPort from '../ports/RepositoryPort';

export default class UserRegister implements useCase {
    constructor(
        private readonly repo: RepositoryPort,
        private readonly passwordPort: PasswordPort,
    ) {}

    async execute(user: User): Promise<void> {
        try {
            const userExists = await this.repo.findByEmail(user.email);

            if (userExists) throw new Error('Email already used');

            const userToSave: User = {
                ...user,
                password: await this.passwordPort.hashPassword(user.password),
            };
            await this.repo.save(userToSave);
        } catch (error) {
            console.log('Error in user Registration', error);
        }
    }
}
