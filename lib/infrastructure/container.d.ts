import { OrganizationRepository } from "../domain/repositories/organization.repository";
import { UserRepository } from "../domain/repositories/user.repository";
import { AccountEnv, AuthEnvParam } from "../infrastructure/config/env.config";
export declare class Container {
    private static instance;
    readonly accountEnv: AccountEnv;
    readonly organizationRepository: OrganizationRepository;
    readonly userRepository: UserRepository;
    private constructor();
    static getInstance(param?: AuthEnvParam): Container;
}
