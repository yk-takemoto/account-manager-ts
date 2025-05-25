"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const env_config_1 = require("../../infrastructure/config/env.config");
const organization_repository_impl_1 = require("../../infrastructure/repositories/organization.repository.impl");
const user_repository_impl_1 = require("../../infrastructure/repositories/user.repository.impl");
let RepositoryModule = class RepositoryModule {
};
exports.RepositoryModule = RepositoryModule;
exports.RepositoryModule = RepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [
            {
                provide: "UserRepository",
                useFactory: (__) => {
                    const authEnvParam = (0, env_config_1.createAuthEnvParam)();
                    switch (authEnvParam.databaseType) {
                        // case "dynamodb":
                        //   return new UserDynamoDBRepository();
                        case "local":
                            if (!authEnvParam.databaseData?.organization || !authEnvParam.databaseData?.user) {
                                throw new Error("Database data is required for local database");
                            }
                            return user_repository_impl_1.UserLocalRepository.getInstance(organization_repository_impl_1.OrganizationLocalRepository.getInstance(authEnvParam.databaseData.organization), authEnvParam.databaseData.user);
                        default:
                            throw new Error(`Unsupported database type: ${authEnvParam.databaseType}`);
                    }
                },
                inject: [config_1.ConfigService],
            },
        ],
        exports: ["UserRepository"],
    })
], RepositoryModule);
