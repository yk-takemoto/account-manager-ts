"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFunctionServer = void 0;
const zod_1 = require("zod");
const auth_usecase_1 = require("../application/auth.usecase");
const AuthByCredentialsInputSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    password: zod_1.z.string(),
});
const GetAccountInfoInputSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    accessToken: zod_1.z.string().optional(),
});
class AuthFunctionServer {
    constructor(usecase = new auth_usecase_1.AuthUsecase()) {
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
exports.AuthFunctionServer = AuthFunctionServer;
