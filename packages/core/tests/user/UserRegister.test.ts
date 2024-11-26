import UserRegister from '../../src/user/service/UserRegister'; // Importe o seu caso de uso
import RepositoryPort from '../../src/user/ports/RepositoryPort'; // Importe o repositório
import PasswordPort from '../../src/user/ports/PasswordPort'; // Importe o PasswordPort

// Crie mocks para as dependências
const mockRepository = {
    findByEmail: jest.fn(),
    save: jest.fn(),
};

const mockPasswordPort = {
    hashPassword: jest.fn(),
};

const userRegister = new UserRegister(
    mockRepository as any,
    mockPasswordPort as any,
);

describe('UserRegister', () => {
    it('should throw an error if the email is already used', async () => {
        const user = { email: 'test@example.com', password: 'password123' };
        mockRepository.findByEmail.mockResolvedValueOnce(user); // Simula que o usuário já existe

        await expect(userRegister.execute(user)).rejects.toThrow(
            'Email already used',
        );
    });

    it('should hash the password before saving the user', async () => {
        const user = { email: 'test@example.com', password: 'password123' };
        mockPasswordPort.hashPassword.mockResolvedValueOnce(
            'hashed-password123',
        );
        mockRepository.findByEmail.mockResolvedValueOnce(null); // Simula que o email não está em uso

        await userRegister.execute(user);

        expect(mockPasswordPort.hashPassword).toHaveBeenCalledWith(
            'password123',
        );
        expect(mockRepository.save).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'hashed-password123',
        });
    });

    it('should save the user when registration is successful', async () => {
        const user = { email: 'test@example.com', password: 'password123' };
        mockRepository.findByEmail.mockResolvedValueOnce(null); // Simula que o email não está em uso
        mockPasswordPort.hashPassword.mockResolvedValueOnce(
            'hashed-password123',
        );

        await userRegister.execute(user);

        expect(mockRepository.save).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'hashed-password123',
        });
    });
});
