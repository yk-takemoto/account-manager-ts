"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const zod_1 = require("zod");
const organization_1 = require("../../domain/models/organization");
const userSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1),
    userName: zod_1.z.string().min(1),
    organization: organization_1.organizationSchema,
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
exports.UserMapper = UserMapper;
