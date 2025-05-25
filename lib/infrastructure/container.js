"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const organization_repository_impl_1 = require("../infrastructure/repositories/organization.repository.impl");
const user_repository_impl_1 = require("../infrastructure/repositories/user.repository.impl");
const env_config_1 = require("../infrastructure/config/env.config");
class Container {
    constructor({ accountEnv = "local", databaseType = "local", databaseData } = (0, env_config_1.createAuthEnvParam)()) {
        // debug
        console.log("Container.constructor authEnvParam: ", JSON.stringify(databaseData));
        this.accountEnv = accountEnv;
        switch (databaseType) {
            case "local":
                if (!databaseData?.organization || !databaseData?.user) {
                    throw new Error("Database data is required for local database");
                }
                this.organizationRepository = organization_repository_impl_1.OrganizationLocalRepository.getInstance(databaseData.organization);
                this.userRepository = user_repository_impl_1.UserLocalRepository.getInstance(organization_repository_impl_1.OrganizationLocalRepository.getInstance(), databaseData.user);
                break;
            default:
                throw new Error(`Unsupported database type: ${databaseType}`);
        }
    }
    static getInstance(param) {
        if (!Container.instance) {
            Container.instance = new Container(param);
        }
        return Container.instance;
    }
}
exports.Container = Container;
