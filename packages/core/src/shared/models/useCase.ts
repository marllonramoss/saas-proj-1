export default interface useCase {
    execute(input: any): Promise<void>;
}
