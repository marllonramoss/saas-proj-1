import User from '../model/User';

export default interface RepositoryPort {
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}
