import UserRegister from '../../user/service/UserRegister'; // Importando a classe que vamos testar
import User from '../../user/model/User'; // A interface do User
import PasswordPort from '../../user/ports/PasswordPort'; // Interface do serviço de senha
import RepositoryPort from '../../user/ports/RepositoryPort'; // Interface do repositório

// Criando os mocks
const mockRepo = {
    findByEmail: jest.fn(), // Criando o mock da função findByEmail
    save: jest.fn(), // Mock do método que salva o usuário
};

const mockPasswordPort = {
    hashPassword: jest.fn(), // Mock do método que realiza o hash da senha
    comparePassword: jest.fn(), // Mock do método que compara senhas
};

// Criando o objeto do caso de uso (UserRegister)
const userRegister = new UserRegister(
    mockRepo as RepositoryPort,
    mockPasswordPort as PasswordPort,
);

// Teste: Verificando se o erro ocorre quando o email já está em uso
it('should throw error if email is already used', async () => {
    // Arrange: Preparando o que vai acontecer
    const existingUser = { email: 'test@example.com', password: 'password' }; // Simulando um usuário existente
    mockRepo.findByEmail.mockResolvedValue(existingUser); // O mock retorna o usuário com o email 'test@example.com'

    const newUser: User = {
        email: 'test@example.com', // O novo usuário tem o mesmo email
        password: 'password123', // Senha do novo usuário
    };

    // Act & Assert: Aqui vamos testar se o erro é lançado
    await expect(userRegister.execute(newUser)) // Tentamos executar o caso de uso
        .rejects // Esperamos que o código rejeite (lance um erro)
        .toThrow('Email already used'); // Esperamos que o erro seja 'Email already used'

    // Verifica se o método de salvar não foi chamado (já que não podemos salvar o usuário com o email repetido)
    expect(mockRepo.save).not.toHaveBeenCalled();
});

it('should register a new user successfully', async () => {
    // Arrange: Preparando os mocks e os dados
    const newUser: User = {
        email: 'newuser@example.com',
        password: 'password123',
    };

    const hashedPassword = 'hashed_password'; // Vamos simular que a senha foi "hashada" para esse valor
    mockRepo.findByEmail.mockResolvedValue(null); // Simulamos que o usuário com esse email não existe
    mockPasswordPort.hashPassword.mockResolvedValue(hashedPassword); // Simulamos o hash da senha

    // Act: Executando o caso de uso
    await userRegister.execute(newUser);

    // Assert: Verificando as chamadas e o comportamento esperado
    expect(mockRepo.findByEmail).toHaveBeenCalledWith(newUser.email); // O repositório deve ter tentado encontrar o usuário pelo email
    expect(mockPasswordPort.hashPassword).toHaveBeenCalledWith(
        newUser.password,
    ); // O método de hash da senha deve ter sido chamado com a senha
    expect(mockRepo.save).toHaveBeenCalledWith({
        // Verificando se o repositório tenta salvar o usuário
        ...newUser,
        password: hashedPassword, // O usuário deve ser salvo com a senha hashada
    });
});
