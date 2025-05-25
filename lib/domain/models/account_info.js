"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountInfoMapper = exports.AccountInfoSchema = void 0;
const zod_1 = require("zod");
exports.AccountInfoSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    userName: zod_1.z.string(),
    orgId: zod_1.z.string(),
    orgName: zod_1.z.string(),
    llmList: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
    translateList: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
});
class AccountInfoMapper {
    constructor(userId, userName, orgId, orgName, llmList, translateList) {
        this.userId = userId;
        this.userName = userName;
        this.orgId = orgId;
        this.orgName = orgName;
        this.llmList = llmList;
        this.translateList = translateList;
        exports.AccountInfoSchema.parse(this);
    }
    static from(args) {
        return new AccountInfoMapper(args.userId, args.userName, args.orgId, args.orgName, args.llmList, args.translateList);
    }
}
exports.AccountInfoMapper = AccountInfoMapper;
