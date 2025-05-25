import { z } from 'zod';
import { jwtDecode } from 'jwt-decode';

const organizationSchema = z.object({
    orgId: z.string().min(1),
    orgName: z.string().min(1),
    llmList: z.array(z.record(z.string())),
    translateList: z.array(z.record(z.string())),
});
class OrganizationMapper {
    constructor(orgId, orgName, llmList, translateList) {
        this.orgId = orgId;
        this.orgName = orgName;
        this.llmList = llmList;
        this.translateList = translateList;
        organizationSchema.parse(this);
    }
    static from(args) {
        return new OrganizationMapper(args.orgId, args.orgName, args.llmList, args.translateList);
    }
    update(args) {
        return OrganizationMapper.from({
            orgId: this.orgId,
            orgName: args.orgName ?? this.orgName,
            llmList: args.llmList ?? this.llmList,
            translateList: args.translateList ?? this.translateList,
        });
    }
}

const userSchema = z.object({
    userId: z.string().min(1),
    userName: z.string().min(1),
    organization: organizationSchema,
});
class UserMapper {
    constructor(userId, userName, organization) {
        this.userId = userId;
        this.userName = userName;
        this.organization = organization;
        userSchema.parse(this);
    }
    static from(args) {
        return new UserMapper(args.userId, args.userName, args.organization);
    }
    update(args) {
        return UserMapper.from({
            userId: this.userId,
            userName: args.userName ?? this.userName,
            organization: args.organization ?? this.organization,
        });
    }
}

const AccountInfoSchema = z.object({
    userId: z.string(),
    userName: z.string(),
    orgId: z.string(),
    orgName: z.string(),
    llmList: z.array(z.record(z.string())),
    translateList: z.array(z.record(z.string())),
});
class AccountInfoMapper {
    constructor(userId, userName, orgId, orgName, llmList, translateList) {
        this.userId = userId;
        this.userName = userName;
        this.orgId = orgId;
        this.orgName = orgName;
        this.llmList = llmList;
        this.translateList = translateList;
        AccountInfoSchema.parse(this);
    }
    static from(args) {
        return new AccountInfoMapper(args.userId, args.userName, args.orgId, args.orgName, args.llmList, args.translateList);
    }
}

class AccountInfoDto {
    static toDomain(accountInfo) {
        const organization = OrganizationMapper.from({
            orgId: accountInfo.orgId,
            orgName: accountInfo.orgName,
            llmList: accountInfo.llmList,
            translateList: accountInfo.translateList,
        });
        return UserMapper.from({
            userId: accountInfo.userId,
            userName: accountInfo.userName,
            organization,
        });
    }
    static fromDomain(user) {
        return AccountInfoMapper.from({
            userId: user.userId,
            userName: user.userName,
            orgId: user.organization.orgId,
            orgName: user.organization.orgName,
            llmList: user.organization.llmList,
            translateList: user.organization.translateList,
        });
    }
}

// import { Injectable } from "@nestjs/common";
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
            const organization = OrganizationMapper.from({
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

// import { Injectable } from "@nestjs/common";
// @Injectable()
class UserLocalRepository {
    constructor(organizationRepository, userData) {
        this.organizationRepository = organizationRepository;
        this.users = new Map();
        this.loadData(userData);
    }
    static getInstance(organizationRepository, userData) {
        if (!UserLocalRepository.instance) {
            if (!userData) {
                throw new Error("User data is required for local database");
            }
            UserLocalRepository.instance = new UserLocalRepository(organizationRepository, userData);
        }
        return UserLocalRepository.instance;
    }
    async loadData(userYaml) {
        for (const [userId, user] of Object.entries(userYaml)) {
            const organization = await this.organizationRepository.findById(user.organization);
            if (organization) {
                const userEntity = UserMapper.from({
                    userId,
                    userName: user.display_name,
                    organization,
                });
                this.users.set(userId, userEntity);
            }
        }
    }
    async findById(userId) {
        return this.users.get(userId) || null;
    }
    async save(user) {
        this.users.set(user.userId, user);
    }
}

const accountEnvSchema = z.enum(["local", "production"]);
const databaseTypeSchema = z.enum(["local", "dynamodb"]);
const organizationYamlSchema = z.record(z.object({
    display_name: z.string().min(1),
    llm_apis: z.array(z.record(z.string())),
    translate_apis: z.array(z.record(z.string())),
}));
const userYamlSchema = z.record(z.object({
    display_name: z.string().min(1),
    organization: z.string().min(1),
}));
const authEnvParamSchema = z.object({
    accountEnv: accountEnvSchema.optional(),
    databaseType: databaseTypeSchema.optional(),
    databaseData: z
        .object({
        organization: organizationYamlSchema.optional(),
        user: userYamlSchema.optional(),
    })
        .optional(),
});
const createAuthEnvParam = () => authEnvParamSchema.parse({
    accountEnv: process.env.AUTHSERVER_ACCOUNT_ENV,
    databaseType: process.env.AUTHSERVER_DATABASE_TYPE,
    databaseData: process.env.ORGANIZATION_YAML && process.env.USER_YAML
        ? {
            organization: organizationYamlSchema.parse(JSON.parse(process.env.ORGANIZATION_YAML)),
            user: userYamlSchema.parse(JSON.parse(process.env.USER_YAML)),
        }
        : undefined,
});

class Container {
    constructor({ accountEnv = "local", databaseType = "local", databaseData } = createAuthEnvParam()) {
        // debug
        console.log("Container.constructor authEnvParam: ", JSON.stringify(databaseData));
        this.accountEnv = accountEnv;
        switch (databaseType) {
            case "local":
                if (!databaseData?.organization || !databaseData?.user) {
                    throw new Error("Database data is required for local database");
                }
                this.organizationRepository = OrganizationLocalRepository.getInstance(databaseData.organization);
                this.userRepository = UserLocalRepository.getInstance(OrganizationLocalRepository.getInstance(), databaseData.user);
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

class AuthUsecase {
    constructor(accountEnv = Container.getInstance().accountEnv, userRepository = Container.getInstance().userRepository) {
        this.accountEnv = accountEnv;
        this.userRepository = userRepository;
    }
    async authByCredentials(userId, __) {
        const user = await this.userRepository.findById(userId);
        // Currently, there is no password verification
        if (!user) {
            return null;
        }
        return userId;
    }
    tokenUser(accessToken) {
        const decoded = jwtDecode(accessToken);
        return decoded?.sub || null;
    }
    async getAccountInfo(userId, accessToken) {
        const authedUserId = accessToken ? this.tokenUser(accessToken) : userId;
        if (!authedUserId) {
            throw new Error("Invalid access token");
        }
        const user = await this.userRepository.findById(authedUserId);
        if (!user) {
            throw new Error("The user or organization information of the authorized user does not exist in the database");
        }
        return AccountInfoDto.fromDomain(user);
    }
}

const AuthByCredentialsInputSchema = z.object({
    userId: z.string(),
    password: z.string(),
});
const GetAccountInfoInputSchema = z.object({
    userId: z.string(),
    accessToken: z.string().optional(),
});
class AuthFunctionServer {
    constructor(usecase = new AuthUsecase()) {
        this.usecase = usecase;
    }
    get accountEnv() {
        return this.usecase.accountEnv;
    }
    async authByCredentials(input) {
        const validated = AuthByCredentialsInputSchema.parse(input);
        return await this.usecase.authByCredentials(validated.userId, validated.password);
    }
    async getAccountInfo(input) {
        const validated = GetAccountInfoInputSchema.parse(input);
        return await this.usecase.getAccountInfo(validated.userId, validated.accessToken);
    }
}

export { AuthFunctionServer };
//# sourceMappingURL=bundle.esm.js.map
