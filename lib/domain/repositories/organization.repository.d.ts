import { Organization } from "../../domain/models/organization";
export interface OrganizationRepository {
    findById(orgId: string): Promise<Organization | null>;
    save(org: Organization): Promise<void>;
}
