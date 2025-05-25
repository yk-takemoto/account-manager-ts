"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUsecase = void 0;
const jwt_decode_1 = require("jwt-decode");
const auth_dto_1 = require("../application/auth.dto");
const container_1 = require("../infrastructure/container");
class AuthUsecase {
    constructor(accountEnv = container_1.Container.getInstance().accountEnv, userRepository = container_1.Container.getInstance().userRepository) {
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
        const decoded = (0, jwt_decode_1.jwtDecode)(accessToken);
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
        return auth_dto_1.AccountInfoDto.fromDomain(user);
    }
}
exports.AuthUsecase = AuthUsecase;
