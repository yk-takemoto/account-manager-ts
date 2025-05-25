import { AccountInfo } from "../domain/models/account_info";
export declare class AuthUsecase {
    readonly accountEnv: "local" | "production";
    private readonly userRepository;
    constructor(accountEnv?: "local" | "production", userRepository?: import("../domain/repositories/user.repository").UserRepository);
    authByCredentials(userId: string, __: string): Promise<string | null>;
    private tokenUser;
    getAccountInfo(userId: string, accessToken?: string): Promise<AccountInfo>;
}
