export default interface PasswordPort {
    hashPassword(password: string): Promise<string>;
    comparePassword(
        plainPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
