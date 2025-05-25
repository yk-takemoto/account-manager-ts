import { UserRepository } from "../domain/repositories/user.repository";
export declare class NestjsExampleService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findUser(userId: string): Promise<{
        userId: string;
        userName: string;
        organization: {
            orgId: string;
            orgName: string;
            llmList: Record<string, string>[];
            translateList: Record<string, string>[];
        };
    } | null>;
}
