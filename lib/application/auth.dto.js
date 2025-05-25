"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInfoDto = void 0;
const user_1 = require("../domain/models/user");
const organization_1 = require("../domain/models/organization");
const account_info_1 = require("../domain/models/account_info");
class AccountInfoDto {
    static toDomain(accountInfo) {
        const organization = organization_1.OrganizationMapper.from({
            orgId: accountInfo.orgId,
            orgName: accountInfo.orgName,
            llmList: accountInfo.llmList,
            translateList: accountInfo.translateList,
        });
        return user_1.UserMapper.from({
            userId: accountInfo.userId,
            userName: accountInfo.userName,
            organization,
        });
    }
    static fromDomain(user) {
        return account_info_1.AccountInfoMapper.from({
            userId: user.userId,
            userName: user.userName,
            orgId: user.organization.orgId,
            orgName: user.organization.orgName,
            llmList: user.organization.llmList,
            translateList: user.organization.translateList,
        });
    }
}
exports.AccountInfoDto = AccountInfoDto;
