import { Organization } from "../../domain/models/organization";
import { OrganizationRepository } from "../../domain/repositories/organization.repository";
import { OrganizationYaml } from "../../infrastructure/config/env.config";
export declare class OrganizationLocalRepository implements OrganizationRepository {
    private static instance;
    private readonly organizations;
    private constructor();
    static getInstance(orgData?: OrganizationYaml): OrganizationRepository;
    private loadData;
    findById(orgId: string): Promise<Organization | null>;
    save(org: Organization): Promise<void>;
}
