import { User } from "../../domain/models/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { OrganizationRepository } from "../../domain/repositories/organization.repository";
import { UserYaml } from "../../infrastructure/config/env.config";
export declare class UserLocalRepository implements UserRepository {
    private readonly organizationRepository;
    private static instance;
    private readonly users;
    private constructor();
    static getInstance(organizationRepository: OrganizationRepository, userData?: UserYaml): UserRepository;
    private loadData;
    findById(userId: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
