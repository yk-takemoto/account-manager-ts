// import { Injectable } from "@nestjs/common";
import { Organization, OrganizationMapper } from "@/domain/models/organization";
import { OrganizationRepository } from "@/domain/repositories/organization.repository";
import { OrganizationYaml } from "@/infrastructure/config/env.config";

// @Injectable()
export class OrganizationLocalRepository implements OrganizationRepository {
  private static instance: OrganizationLocalRepository;
  private readonly organizations: Map<string, Organization>;

  private constructor(orgData: OrganizationYaml) {
    this.organizations = new Map();
    this.loadData(orgData);
  }

  static getInstance(orgData?: OrganizationYaml): OrganizationRepository {
    if (!OrganizationLocalRepository.instance) {
      if (!orgData) {
        throw new Error("Organization data is required for local database");
      }
      OrganizationLocalRepository.instance = new OrganizationLocalRepository(orgData);
    }
    return OrganizationLocalRepository.instance;
  }

  private loadData(organizationYaml: OrganizationYaml) {
    Object.entries(organizationYaml).forEach(([orgId, org]) => {
      const organization = OrganizationMapper.from({
        orgId,
        orgName: org.display_name,
        llmList: org.llm_apis.map((api: any) => ({ ...api })),
        translateList: org.translate_apis.map((api: any) => ({ ...api })),
      });
      this.organizations.set(orgId, organization);
    });
  }

  async findById(orgId: string): Promise<Organization | null> {
    return this.organizations.get(orgId) || null;
  }

  async save(org: Organization): Promise<void> {
    this.organizations.set(org.orgId, org);
  }
}
