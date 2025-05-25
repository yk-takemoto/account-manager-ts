"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthEnvParam = exports.authEnvParamSchema = exports.userYamlSchema = exports.organizationYamlSchema = exports.databaseTypeSchema = exports.accountEnvSchema = void 0;
const zod_1 = require("zod");
exports.accountEnvSchema = zod_1.z.enum(["local", "production"]);
exports.databaseTypeSchema = zod_1.z.enum(["local", "dynamodb"]);
exports.organizationYamlSchema = zod_1.z.record(zod_1.z.object({
    display_name: zod_1.z.string().min(1),
    llm_apis: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
    translate_apis: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
}));
exports.userYamlSchema = zod_1.z.record(zod_1.z.object({
    display_name: zod_1.z.string().min(1),
    organization: zod_1.z.string().min(1),
}));
exports.authEnvParamSchema = zod_1.z.object({
    accountEnv: exports.accountEnvSchema.optional(),
    databaseType: exports.databaseTypeSchema.optional(),
    databaseData: zod_1.z
        .object({
        organization: exports.organizationYamlSchema.optional(),
        user: exports.userYamlSchema.optional(),
    })
        .optional(),
});
const createAuthEnvParam = () => exports.authEnvParamSchema.parse({
    accountEnv: process.env.AUTHSERVER_ACCOUNT_ENV,
    databaseType: process.env.AUTHSERVER_DATABASE_TYPE,
    databaseData: process.env.ORGANIZATION_YAML && process.env.USER_YAML
        ? {
            organization: exports.organizationYamlSchema.parse(JSON.parse(process.env.ORGANIZATION_YAML)),
            user: exports.userYamlSchema.parse(JSON.parse(process.env.USER_YAML)),
        }
        : undefined,
});
exports.createAuthEnvParam = createAuthEnvParam;
