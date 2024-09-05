export declare class UsersService {
    private readonly users;
    findOne(username: string): Promise<{
        id: number;
        username: string;
        password: string;
    }>;
    validateUser(username: string, password: string): Promise<{
        id: number;
        username: string;
    }>;
}
