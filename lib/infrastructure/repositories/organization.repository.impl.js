"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationLocalRepository = void 0;
// import { Injectable } from "@nestjs/common";
const organization_1 = require("../../domain/models/organization");
// @Injectable()
class OrganizationLocalRepository {
    constructor(orgData) {
        this.organizations = new Map();
        this.loadData(orgData);
    }
    static getInstance(orgData) {
        if (!OrganizationLocalRepository.instance) {
            if (!orgData) {
                throw new Error("Organization data is required for local database");
            }
            OrganizationLocalRepository.instance = new OrganizationLocalRepository(orgData);
        }
        return OrganizationLocalRepository.instance;
    }
    loadData(organizationYaml) {
        Object.entries(organizationYaml).forEach(([orgId, org]) => {
            const organization = organization_1.OrganizationMapper.from({
                orgId,
                orgName: org.display_name,
                llmList: org.llm_apis.map((api) => ({ ...api })),
                translateList: org.translate_apis.map((api) => ({ ...api })),
            });
            this.organizations.set(orgId, organization);
        });
    }
    async findById(orgId) {
        return this.organizations.get(orgId) || null;
    }
    async save(org) {
        this.organizations.set(org.orgId, org);
    }
}
exports.OrganizationLocalRepository = OrganizationLocalRepository;
