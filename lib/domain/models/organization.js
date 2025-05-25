"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMapper = exports.organizationSchema = void 0;
const zod_1 = require("zod");
exports.organizationSchema = zod_1.z.object({
    orgId: zod_1.z.string().min(1),
    orgName: zod_1.z.string().min(1),
    llmList: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
    translateList: zod_1.z.array(zod_1.z.record(zod_1.z.string())),
});
class OrganizationMapper {
    constructor(orgId, orgName, llmList, translateList) {
        this.orgId = orgId;
        this.orgName = orgName;
        this.llmList = llmList;
        this.translateList = translateList;
        exports.organizationSchema.parse(this);
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
exports.OrganizationMapper = OrganizationMapper;
